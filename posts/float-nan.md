---
title: "When is a Float not a Float?"
date: "2014-02-01"
---

I came across a small issue the other day that I thought was interesting enough to make a post about. One of the methods I was interfacing with that returned a float would occasionally return a value of `NaN` (depending on the input), whereas I always wanted to use a numeric value.

To get around this I used the following snippet:

```java
if (Float.isNaN(f))
{
    f = 0.0f;
}
```

But what’s interesting about this problem is that you can’t store a float valued as `NaN` in your class to compare against the other values by using `==` because, and I quote from a StackOverflow answer, “Java implements the IEEE-754 floating point standard which guarantees that any comparison against `NaN` will return false (except `!=` which returns true)”.

This gives rise to the brilliant alternative which is to compare a float to itself! If it returns false, then you know it’s `NaN`.

```
if (f != f)
{
    // It's NaN.
}
```

While I’d be reluctant to actually use it due to lack of intuitiveness, little tricks like this are really interesting.