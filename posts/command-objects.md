---
title: "Grails: Transient properties on Command Objects"
date: "2014-10-28"
---

On Grails domain classes it’s possible to declare variables as transient with the `transients` property:

```java
static transients = ['firstName']
```

Oftentimes its desirable to declare properties on command objects and exempt them from binding/validation in a similar manner.

I found this was possible in the following way:

```java
class SubmitDetailsCommand {
 
String name
String address
 
String previousAddress
 
static constraints = {
    previousAddress nullable: true, bindable: false
}
```

Using this the `name` and `address` fields will be bound and validated, but the `previousAddress` won’t be bound (and will pass validation). I also found that no validation errors were raised even without the `nullable` declaration when `previousAddress`‘ type was explicitly declared (in my case I was using `List`, as opposed to this example), but the validation errors occurred when it was `def`.

Alternatively if the transient property is to be used as part of custom validation (which, when the controller’s method parameter is a type of command object is performed before even the first line of code in the method), as in the following:

```java
class SubmitDetailsCommand {
 
String name
String address
 
String previousAddress
 
static constraints = {
    address validator: { address, command -> address != previousAddress }
    previousAddress nullable: true, bindable: false
}
```

The following technique can be used:

```java
def controllerMethod() {
 
    def command = new SubmitDetailsCommand()
    bindData(command, params << [previousAddress: session.usersPreviousAddress], [include: ['name', 'address', 'previousAddress']])
 
    command.validate()
 
    if (command.hasErrors()) {
        ...
    }
 
    ...
}
```

Unfortunately the implicit binding/validation and the nice convention of declaring it as a method parameter is not being leveraged, but this was the best solution I found. This technique was useful when the method was part of a web flow which relied on values deduced in previous stages on the flow.