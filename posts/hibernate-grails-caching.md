---
title: "Hibernate Caching in Grails with Ehcache"
date: "2017-11-14"
---

For a while I’ve ignored Grails’ caching options, often thinking “well even if they’re not optimised, at least they’re doing something”. But I spent some time recently trying to minimise a delay on querying some relatively static data, and diving into caching was a part of this.

### Sample application

Consider a Grails 3 application with the following domain:

```java
@ToString(includePackage = false, includes = 'username')
class Person {
 
    String username
 
    static mapping = {
        version false
        id generator: 'assigned'
    }
 
    static constraints = {
        id bindable: true
    }
}
```

and the following config:

```yml
hibernate.cache:
  queries: false
  use_second_level_cache: false
  use_query_cache: false
  region.factory_class: org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory
```

*Note: the hibernate ehcache dependency must also be included in the application’s build.gradle, e.g. compile ‘org.hibernate:hibernate-ehcache:5.1.5.Final’*

and the following bootstrapped data:

```java
new Person(id: 1, username: 'user1').save()
new Person(id: 2, username: 'user2').save()
```

### First Level Cache

By default hibernate has the first level cache enabled. Retrieving an object from the database places it into the first level cache, and if the same ID is requested *in the current session*, it will be retrieved from the first level cache instead of the database. For example, consider the following code:

```java
Person getPerson(Long id) {
 
    log.info "Getting person with id ${id}"
 
    def person = Person.get(id)
 
    log.info "Retrieved person: ${person}"
 
    return person
}
```

Running this method with SQL logging enabled, every time we call the method the log output is:

```
2017-10-31 19:30:00.970  INFO 3448 --- [nio-8080-exec-4] uk.co.ceva24.hce.PersonService     :  Getting person with id 1
Hibernate: select person0_.id as id1_0_0_, person0_.username as username2_0_0_ from person person0_ where person0_.id=?
2017-10-31 19:30:00.971  INFO 3448 --- [nio-8080-exec-4] uk.co.ceva24.hce.PersonService     :  Retrieved person: Person(user1)
```

If we add a second call:

```java
Person getPerson(Long id) {
 
    log.info "Getting person with id ${id}"
 
    def person = Person.get(id)
    def samePerson = Person.get(id)
 
    log.info "Retrieved person: ${person}"
 
    return person
}
```

The log output is:

```
2017-10-31 19:32:33.305  INFO 3448 --- [nio-8080-exec-1] uk.co.ceva24.hce.PersonService     :  Getting person with id 1
Hibernate: select person0_.id as id1_0_0_, person0_.username as username2_0_0_ from person person0_ where person0_.id=?
2017-10-31 19:32:33.325  INFO 3448 --- [nio-8080-exec-1] uk.co.ceva24.hce.PersonService     :  Retrieved person: Person(user1), and same person: Person(user1)
```

There’s still only one database call – this is the first level cache in action.

### Second Level Cache

The second level cache in Hibernate is the same as the first level cache, except it *persists across sessions*. However, Hibernate doesn’t know how long we want data to persist for, when the cache should be cleared etc, so we use a dedicated caching engine called Ehcache to configure this.

In order to use the second level cache, we need to change the config:

```yml
hibernate.cache:
  queries: false
  use_second_level_cache: true
  use_query_cache: false
  region.factory_class: org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory
```

but then also enable a cache for each domain we’d like to cache:

```java
@ToString(includePackage = false, includes = 'username')
class Person {
 
    String username
 
    static mapping = {
        version false
        cache true
        id generator: 'assigned'
    }
 
    static constraints = {
        id bindable: true
    }
}
```

Technically this is called the entity cache. It’s also possible to cache entities’ relationships (more details in the caching section in the [GORM user guide](https://gorm.grails.org/7.0.0/hibernate/manual/index.html#ormdsl).

On start-up we then get a log message like this:

```
2017-10-31 19:45:21.417  WARN 3796 --- [           main] n.s.ehcache.config.ConfigurationFactory  :  No configuration found. Configuring ehcache from ehcache-failsafe.xml  found in the classpath: jar:file:/C:/Users/Chris/.gradle/caches/modules-2/files-2.1/net.sf.ehcache/ehcache/2.10.4/9022b1eedfafa11039597b1c1918c1abe414df93/ehcache-2.10.4.jar!/ehcache-failsafe.xml
2017-10-31 19:45:21.715  WARN 3796 --- [           main] o.h.c.e.AbstractEhcacheRegionFactory     :  HHH020003: Could not find a specific ehcache configuration for cache named [uk.co.ceva24.hce.Person]; using defaults.
```

To fix this, we need to define our own cache settings for the domain. This is done by adding an `ehcache.xml` to the resources folder:

```xml
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nonamespaceschemalocation="ehcache.xsd">
  <cache name="uk.co.ceva24.hce.Person" maxelementsinmemory="1000" eternal="false" timetoidleseconds="10" timetoliveseconds="10" overflowtodisk="false" diskpersistent="false" memorystoreevictionpolicy="LRU" />
  <defaultCache maxelementsinmemory="50" eternal="false" timetoidleseconds="10" timetoliveseconds="10" overflowtodisk="false" diskpersistent="false" memorystoreevictionpolicy="LRU" />
</ehcache>
```

Note: it’s worth reading up on caching with ehcache to know what some of these settings do and how the cache can be tuned. I’ve set a low cache TTL in this app for ease of example.

Now let’s try the call:

```
2017-10-31 19:49:37.218  INFO 3500 --- [nio-8080-exec-2] uk.co.ceva24.hce.PersonService     :  Getting person with id 1
Hibernate: select person0_.id as id1_0_0_, person0_.username as username2_0_0_ from person person0_ where person0_.id=?
2017-10-31 19:49:37.242  INFO 3500 --- [nio-8080-exec-2] uk.co.ceva24.hce.PersonService     :  Retrieved person: Person(user1)
```

And the database is queried once, as you might expect. Calling it again within the next 10 seconds however:

```
2017-10-31 20:00:39.051  INFO 3500 --- [nio-8080-exec-4] uk.co.ceva24.hce.PersonService     :  Getting person with id 1
2017-10-31 20:00:39.052  INFO 3500 --- [nio-8080-exec-4] uk.co.ceva24.hce.PersonService     :  Retrieved person: Person(user1)
```

The data has been retrieved from the second level cache, and no database call has been made.
After 10 seconds expire, once again the output is:

```
2017-10-31 20:07:38.508  INFO 3500 --- [nio-8080-exec-7] uk.co.ceva24.hce.PersonService     :  Getting person with id 1
Hibernate: select person0_.id as id1_0_0_, person0_.username as username2_0_0_ from person person0_ where person0_.id=?
2017-10-31 20:07:38.509  INFO 3500 --- [nio-8080-exec-7] uk.co.ceva24.hce.PersonService     :  Retrieved person: Person(user1)
```

### Query Cache

The second level entity cache helps with direct object retrieval, but this doesn’t speed up more complex queries. The query cache is a separate cache also maintained by ehcache that solves this problem. It’s worth however [reading up on whether it’s worth the trade-offs](https://puredanger.github.io/tech.puredanger.com/2009/07/10/hibernate-query-cache/) in your use case.

First of all, let’s run a query:

```java
List getPeople(String term) {
 
    log.info "Getting people with username matching '${term}'"
 
    def people = Person.findAllByUsernameIlike("%${term}%")
 
    log.info "Retrieved people: ${people}"
 
    return people
}
```

Running this, and all subsequent calls (with second level cache enabled) logs the following:

```
2017-10-31 20:12:04.885  INFO 6488 --- [nio-8080-exec-2] uk.co.ceva24.hce.PersonService     :  Getting people with username matching 'user'
Hibernate: select this_.id as id1_0_0_, this_.username as username2_0_0_ from person this_ where lower(this_.username) like ?
2017-10-31 20:12:04.888  INFO 6488 --- [nio-8080-exec-2] uk.co.ceva24.hce.PersonService     :  Retrieved people: [Person(user1), Person(user2)]
```

This is because query caching isn’t enabled. To enable it we change the config:

```yml
hibernate.cache:
  queries: false
  use_second_level_cache: true
  use_query_cache: true
  region.factory_class: org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory
```

And add two new cache regions:

```xml
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nonamespaceschemalocation="ehcache.xsd">
  <cache name="org.hibernate.cache.spi.UpdateTimestampsCache" maxelementsinmemory="10000" eternal="true" overflowtodisk="false" diskpersistent="false" />
  <cache name="org.hibernate.cache.internal.StandardQueryCache" maxelementsinmemory="1000" eternal="false" timetoidleseconds="10" timetoliveseconds="10" overflowtodisk="false" diskpersistent="false" memorystoreevictionpolicy="LRU" />
  <cache name="uk.co.ceva24.hce.Person" maxelementsinmemory="1000" eternal="false" timetoidleseconds="10" timetoliveseconds="10" overflowtodisk="false" diskpersistent="false" memorystoreevictionpolicy="LRU" />
  <defaultCache maxelementsinmemory="50" eternal="false" timetoidleseconds="10" timetoliveseconds="10" overflowtodisk="false" diskpersistent="false" memorystoreevictionpolicy="LRU" />
</ehcache>
```

More on what these caches do is available in the Ehcache documentation.

Then we run the query again. On the second run, as we’d hope, the query is cached and the database isn’t accessed:

```
2017-10-31 20:20:53.983  INFO 10088 --- [nio-8080-exec-4] uk.co.ceva24.hce.PersonService     :  Getting people with username matching 'user'
2017-10-31 20:20:53.995  INFO 10088 --- [nio-8080-exec-4] uk.co.ceva24.hce.PersonService     :  Retrieved people: [Person(user1), Person(user2)]
```

### Automatically Enabled Query Caching

As a final note I’d like to mention that it’s possible to selectively cache queries and entities in the second level cache, and it’s also possible to turn on the query cache without using the second level cache (in which case the entity keys of the query result are cached, but the entities themselves are not which causes Hibernate to individually query for each entity – kind of useless).
Because I enabled `cache true` in the domain class, it seems that all of the dynamic finder queries are cached by default. This can be turned off:

```java
def people = Person.findAllByUsernameIlike("%${term}%", [cache: false])
```

Conversely with criteria queries, caching would have to be explicitly enabled:

```java
def people = Person.createCriteria().list {
    ilike('username', "%${term}%")
    cache true
}
```

If the final config property, hibernate.cache.queries is enabled:

```yml
hibernate.cache:
  queries: true
  use_second_level_cache: true
  use_query_cache: true
  region.factory_class: org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory
```

Then both dynamic finders and criteria queries are automatically cached.

I’ve uploaded the sample application used in this post to [Github](https://github.com/Ceva24/hibernate-cache-example).