---
title: "Grails: GORM Querying Behaviour"
date: "2015-08-29"
---

There are various ways of querying a database with Grails, but they behave slightly differently. In this post I want to talk about the behaviour of dynamic finders and where closures specifically.

Dynamic finders take advantage of Groovy’s meta-programming paradigm, and are very simple to write. For example:

```java
Course.findByCourseCode('G400')

Person.findByForenameAndSurname('Chris', 'Evans')
 
Person.findAllWhereAgeGreaterThan(24)
```

Alternatively these could be done with where closures:

```java
Course.where { courseCode == 'G400' }.get()
 
Person.where { forename == 'Chris'
               surname == 'Evans' }.get() 
// Or alternatively:
Person.where { forename == 'Chris' && surname == 'Evans' }.get()
 
Person.where { age > 24 }.list()
```

Both are easy to use and understand. There are advantages that can be seen for each straight away – `findBy` and `findAllBy` are cleaner when using simple criteria and there’s no need for the slightly cluttery `.get()`, whereas where closures can take advantage of complex Groovy statements.

However, what’s not obvious is how they behave depending on the results. When `findBy` is called, it will return a single result – the first result it finds in the table. When `.get()` is called, it expects to find a single result – if it doesn’t, a `NonUniqueResultsException` is thrown. This can be useful when you need to ensure that only one result is returned, without having to manually check and throw an exception afterwards.
It’s also worth noting that dynamic finders will not throw compile errors with incorrect method names whereas where closures can be checked at compile-time.

For simple queries I tend to use dynamic finders by default as they read more nicely, unless I specifically need the uniqueness check.