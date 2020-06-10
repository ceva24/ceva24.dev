---
title: "Importing SSL Certificates into the Java TrustStore"
date: "2020-06-10"
---

In order to make an HTTPS request in Java, the SSL Certificate issued to the site you're trying to connect to needs to be in a TrustStore.
 
OpenJDK 10 onwards comes bundled with a set of root CA certificates so it's less of an issue, but in older versions of Java this isn't the case.

The following example running under `JDK 1.8.0_31` attempts to connect to https://www.cam.ac.uk/:

```java
log.info new RestTemplate().getForEntity(
    new URI('https://www.cam.ac.uk/'),
    String
).statusCode.toString()
```

And throws the following exception:

```java
Exception in thread "main" org.springframework.web.client.ResourceAccessException: I/O error on GET request for "https://www.cam.ac.uk/": sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target; nested exception is javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	at org.springframework.web.client.RestTemplate.doExecute(RestTemplate.java:748)
	at org.springframework.web.client.RestTemplate.execute(RestTemplate.java:714)
	at org.springframework.web.client.RestTemplate.getForObject(RestTemplate.java:333)
	at org.springframework.web.client.RestOperations$getForObject.call(Unknown Source)
	at org.codehaus.groovy.runtime.callsite.CallSiteArray.defaultCall(CallSiteArray.java:47)
	at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:115)
	at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:135)
	at dev.ceva24.https.HttpsApplication.main(HttpsApplication.groovy:12)
Caused by: javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

The steps to resolve this issue are as follows:

### Download the SSL certificate

This is straightforward in Google Chrome: navigate to the website, click the padlock in the address bar and select `Certificate`, then go to the `Details` tab and select `Copy to File...`.

![Downloading an SSL certificate](/posts/java-truststore/ssl-certificate.png)

### Add the certificate to the TrustStore

In the relevant JRE (if using a JDK this will be in the `/jre` folder within it), import the certificate into the `cacerts` store. In my case this is:

```console
C:\Program Files\Java\jdk1.8.0_31\jre\bin> keytool -import -trustcacerts -keystore "C:\Program Files\Java\jdk1.8.0_31\jre\lib\security\cacerts" -alias camacuk -file "C:\camacuk.cer"
```

This will prompt for a password; the default value is `changeit`.

`jre\lib\security\cacerts` is the default TrustStore, but you can tell Java to use a different one with the following flags:

```console
-Djavax.net.ssl.trustStore="C:\mytruststore.jks" -Djavax.net.ssl.trustStorePassword=changeit
``` 

### Result

After following these steps, re-running the example gives us:

```
15:43:02.472 [main] DEBUG org.springframework.web.client.RestTemplate - HTTP GET https://www.cam.ac.uk/
15:43:02.480 [main] DEBUG org.springframework.web.client.RestTemplate - Accept=[text/plain, application/json, application/*+json, */*]
15:43:02.825 [main] DEBUG org.springframework.web.client.RestTemplate - Response 200 OK
15:43:02.826 [main] DEBUG org.springframework.web.client.RestTemplate - Reading to [java.lang.String] as "text/html;charset=utf-8"
15:43:02.934 [main] INFO dev.ceva24.https.HttpsApplication - 200 OK
```

Thanks for reading!