---
title: "Mockito: Tips and Tricks"
date: "2015-04-18"
---

I recently finished re-working a small Java-based project that didn’t have any unit tests. I chose to use the popular [JUnit](https://junit.org/) + [Mockito](https://site.mockito.org/) combo for adding these, and this post contains some of the things I picked up on (sometimes after much blood, sweat and tears) when learning the framework.

<!-- end -->

First of all I should mention that for anything but the simplest unit tests, the [PowerMock](https://github.com/powermock/powermock) extension is a must-have that brings a lot more mocking power to Mockito – functionality that Spock comes packaged with by default such as mocking static classes.

### Ways of Specifying Behaviour

I’ve noticed that there seem to be two ways of specifying how a mock should behave using Mockito:

```java
when(cat.getName()).thenReturn("Tiddles");
```

and:

```java
doReturn("Tiddles").when(cat).getName();
```

Notice that in the second one the `getName()` method is applied to the return of the when call, not the cat itself.

The difference between these two, besides readability, is that the first one actually invokes the `getName()` method once when overriding the behaviour, whereas the second does not. This can cause unwanted test behaviour, so I try to use the second where at all possible despite the fact that I think the first is a little more readable.

### Mocking Functionality in Abstract Classes

To create a standard mock the following snippet is standard in Mockito:

```java
List users = mock(List.class);
```

But it’s also possible to create an object from an abstract class that mocks out the abstract methods and runs the real ones. The abstract methods can still be observed for verification purposes.

```java
AbstractParent parent = mock(AbstractParent.class, CALLS_REAL_METHODS);
```

### Mocking Static Classes

This requires PowerMock to work (which means using the correct `@RunWith` and `@PrepareForTest` annotations).

```java
mockStatic(System.class);

when(System.getenv()).doReturn(mock(Map.class));
```

### Avoiding Initialisation Code in Constructors

Powermock comes with an extremely handy class that allows you to create an object without executing the code in the constructor, which can make it easier to test an object’s method without having to mock any of the stuff that might be needed in order to actually get the class created.

```java
Whitebox.newInstance(ComplexConstructor.class);
```

There are lots of other things I learnt when picking up Mockito, but these were some of the trickiest ones.
