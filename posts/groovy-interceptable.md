---
title: "Spock Interaction Testing with GroovyInterceptable"
date: "2014-06-09"
---

Grails uses [Spock](http://spockframework.org/) as its testing framework by default. Spock can be a fantastically expressive framework, but I came across a stumbling block recently when trying to test a class with interceptable methods.

[`GroovyInterceptable`](http://groovy.codehaus.org/api/groovy/lang/GroovyInterceptable.html) is an interface that acts in a similar manner to Groovy proxies – any time a method is called on an object of a class that implements it, it reroutes through the `invokeMethod()` method in `GroovyObject`, which can be overridden to determine the appropriate action.

Unfortunately this means for Spock interaction testing, the code below will return a ‘too few invocations’ error message.

```java
expect: 1 * myMockInterceptedObject.hello(*_) >> 'hello world'
```

In order to determine that the correct method is being invoked, instead the following has to be done:

```java
expect: 1 * myMockInterceptedObject.invokeMethod('hello', *_) >> 'hello world'
```
