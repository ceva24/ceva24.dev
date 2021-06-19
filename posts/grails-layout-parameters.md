---
title: "Grails: Passing Variables from a View to a Layout"
date: "2015-08-29"
---

In order to pass variables to normal Grails views or templates the `model` parameter is used, which is a `Map` that contains all values you want to make available to the view:

```java
<g:render template="cart/checkout" model="${[contents: contents]}"></g:render>
```

This won’t work for views setting variables that are used in layouts though. Nor does setting and then referencing the variable directly in the layout:

```java
<g:set var="contents" value="${contents}"></g:set>
```

because the layout is processed first, including its templates, and only then is the decorated page loaded. To work around this the SiteMesh `parameter` tag and the `pageProperty` method from the default TagLib can be used.

In the page to be decorated:

```java
<parameter name="contents" value="${contents}"></parameter>
```

In the layout:

```java
${pageProperty(name: 'page.contents')}
```

Note the `page.` prefix. Using this, the parameter is embedded into the page statically and can be referenced during the layout rendering process. I haven’t found a better way to do this at the moment.
