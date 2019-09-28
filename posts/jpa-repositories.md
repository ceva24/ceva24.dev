---
title: "Bootstrapping Test Data against Read-only JPA Repositories in Spring Boot"
date: "2016-01-04"
---

If you’re working against a database in a Spring Boot application, chances are you’ll need to bootstrap data for your tests. [Spring suggests using `.sql` files](https://docs.spring.io/spring/docs/5.1.9.RELEASE/spring-framework-reference/testing.html#testcontext-executing-sql-declaratively), however it soon becomes unwieldy to maintain a large repository of scripts.

Another way to do this is to save domain objects using a [JPA repository](https://docs.spring.io/spring/docs/5.1.9.RELEASE/spring-framework-reference/data-access.html#dao), like in this example Spock test:

```java
@Autowired
PersonRepository personRepository
 
def 'my test'() {
 
    setup:
    personRepository.save new Person(id: 1, forename: 'Chris')
 
    expect:
    ...
}
```

But if your database table is read-only then you won’t have a save method, or maybe not even a repository depending on your use case.

However, there is a way around this. By taking advantage of `@IntegrationTest` in Spring and its respective `@ContextConfiguration`, we can create a test-only JPA repository that contains the save functionality. This can be done as follows:

Under `src/test/groovy` we can put another Spring application, that can be empty:

```java
@SpringBootApplication
class TestApplication {}
```

then in the same package or a sub-package create a repository against the domain object:

```java
interface TestProductRepository extends Repository<Product, Long> {
 
    Product save(Product product)
}
```

This will be picked up by the Spring auto-configuration. It can then be autowired into tests that include the `TestApplication` in their Spring context (note: these tests can still include the standard application context as shown below):

```java
@IntegrationTest
@ContextConfiguration(
    loader = SpringApplicationContextLoader,
    classes = [Application, TestApplication]
)
@Transactional
class ProductSpec {
 
    @Autowired
    TestProductRepository testProductRepository
 
    def 'my test'() {
 
        setup:
        testProductRepository.save(new Product(
                id: 1,
                name: 'Bottle of Coke',
                price: new BigDecimal(1.10)
        ))
 
        expect:
        ...
    }
}
```

As the repository is in the test package, it won’t be available at runtime in any profile – only when running the tests. This gives the best of both worlds as it allows bootstrapping test data within the tests themselves, and doesn’t bloat the application code.