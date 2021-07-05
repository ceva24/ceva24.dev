---
title: "Java: A Simple REST Client Template"
date: "2012-11-26"
---

More and more of my projects include an aspect of calling out to remote systems, be it to a web service via SOAP, or more recently to REST architectures. As part of this work, I’ve adopted a certain approach to creating web service consumers.

![Carrie RESTing](./RESTing-300x229.jpg)

I’ll illustrate this with a simple example, connecting to the [Facebook Graph API](https://developers.facebook.com/docs/reference/api/), the most recent iteration of its REST API (with a fancy name).

<!-- end -->

### Pre-requisites

Web services are part of the J2EE rather than standard JDK, which means downloading some JAR files. One of the differences with the J2EE that you don’t see so much with standard JDK APIs is that there are many different or alternative implementations of these architectures to choose from, and it’s not always cut-and-dry what the differences are or what the best choice for your app is.
Regardless, the official implementation for RESTful APIs is [Jersey](https://jersey.java.net/).

The format that’s returned depends entirely on the API, though most implementations (I’ve come across) use XML or JSON. All of the Facebook Graph API’s responses are JSON objects, thus another pre-requisite is a suitable library (if we want a whole host of rich features). There are no less than [23 implementations](https://www.json.org/) of JSON in Java. I decided to go with [google-gson](https://github.com/google/gson).

### REST Template

This is the format I use for client objects:

```java
package org.chrise.facebook.model;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.client.urlconnection.HTTPSProperties;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.core.util.MultivaluedMapImpl;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import javax.net.ssl.SSLContext;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;

public class FacebookClient
{
    private static final String APP_ID = "redacted";
    private static final String APP_SECRET = "redacted";

    private static final String PARAM_ACCESS_TOKEN = "access_token";

    private final WebResource graphBase;
    private String authToken;

    public FacebookClient() throws NoSuchAlgorithmException, KeyManagementException
    {
        // Client and SSL configuration.
        final ClientConfig config = new DefaultClientConfig();
        final SSLContext ctx = SSLContext.getInstance("SSL");
        authToken = null;

        // Trust certificate issuers defined in the default implementation.
        ctx.init(null, null, null);
        config.getProperties().put(HTTPSProperties.PROPERTY_HTTPS_PROPERTIES,
                new HTTPSProperties(null, ctx));

        final Client client = Client.create(config);

        // Create base url resource.
        graphBase = client.resource("https://graph.facebook.com/");
    }

    public void authenticate()
    {
        // Create OAuth resource and encode client details.
        WebResource oauth = graphBase.path("oauth/access_token");

        MultivaluedMap params = new MultivaluedMapImpl();
        params.add("client_id", APP_ID);
        params.add("client_secret", APP_SECRET);
        params.add("grant_type", "client_credentials");

        oauth = oauth.queryParams(params);
        WebResource.Builder oauthBuilder = oauth.type(MediaType.APPLICATION_JSON_TYPE);

        // HTTP GET.
        ClientResponse response = oauthBuilder.get(ClientResponse.class);

        // Result is in the format 'access_token=<token>'.
        authToken = response.getEntity(String.class).split("=")[1];
    }

    public String getObjectProperties(String objectName)
    {
        // Create user timeline resource and encode the user name.
        final WebResource profile = graphBase.path(objectName);
        WebResource.Builder profileBuilder = profile.type(MediaType.APPLICATION_JSON_TYPE);

        // HTTP GET.
        ClientResponse response = profileBuilder.get(ClientResponse.class);

        return response.getEntity(String.class);
    }

    public String getObjectLikes(String objectName)
    {
        // Create likes resource and encode the access token.
        WebResource likes = graphBase.path(objectName + "/likes");
        likes = likes.queryParam(PARAM_ACCESS_TOKEN, authToken);
        WebResource.Builder likesBuilder = likes.type(MediaType.APPLICATION_JSON_TYPE);

        // HTTP GET.
        ClientResponse response = likesBuilder.get(ClientResponse.class);

        return response.getEntity(String.class);
    }

    public boolean isAuthenticated()
    {
        return (authToken != null ? true : false);
    }
}
```

This small class has a constructor and four methods, for [authenticating](https://developers.facebook.com/docs/technical-guides/login/), accessing an [object’s details](https://developers.facebook.com/docs/reference/api/user/), accessing an [object’s likes](https://developers.facebook.com/docs/reference/api/user/#likes) and returning the authenticated status.

The constructor creates a base resource to the top-level entry point of the API, i.e. `https://graph.facebook.com/`. The important concept is that the base resource is in scope for the lifetime of the `FacebookClient` object, and temporary resources pointing to specific nodes are created from this base.
These temporary resources handle parameterising, embedding cookies etc., e.g. adding the `grant_type` parameter in `https://graph.facebook.com/oauth/access_token?grant_type=client_credentials`.

It should be noted that this example accesses the API at the [application level](https://developers.facebook.com/docs/howtos/login/login-as-app/) (I set up an application in the developers area of Facebook in order to be granted an app ID and key). The alternative would be to prompt users to allow my faux-app access to the API at the user level via a “Login to Facebook” prompt. Due to the nature of the current implementation, certain requests are off-limits e.g. listing friends of users. Accessing an object’s details doesn’t require authentication, but it only returns a basic subset of information from their public profile.
Interestingly enough, access to a Page’s likes is available, despite this connection not being mention in the [official documentation](https://developers.facebook.com/docs/reference/api/page/).
Results

We can invoke the methods like so:

```java
FacebookClient client = new FacebookClient();
String message = client.getObjectProperties("ceva24");
System.out.println(message);

FacebookClient client = new FacebookClient();
client.authenticate();
String message = client.getObjectLikes("cocacola");
System.out.println(message);
```

Which gives us these respective results:

```json
{
    "id": "273100900",
    "name": "Christian Evans",
    "first_name": "Christian",
    "last_name": "Evans",
    "username": "ceva24",
    "gender": "male",
    "locale": "en_GB"
}
```

```json
{
    "data": [
        {
            "name": "Atlanta Food & Wine Festival",
            "category": "Community",
            "id": "123355014367126"
        },
        {
            "name": "Six Flags Great Adventure",
            "category": "Attractions/things to do",
            "id": "69421318512"
        },
        {
            "name": "Kings Dominion",
            "category": "Attractions/things to do",
            "id": "32237381874"
        },
        {
            "name": "ESSENCE Music Festival",
            "category": "Concert tour",
            "id": "42125257610"
        },
        {
            "name": "Spotify",
            "category": "App page",
            "id": "6243987495"
        },
        {
            "name": "Coca-Cola light",
            "category": "Food/beverages",
            "id": "287552055150"
        },
        {
            "name": "Coca-Cola Zero",
            "category": "Food/beverages",
            "id": "61124008229"
        },
        {
            "name": "Fanta",
            "category": "Food/beverages",
            "id": "23550666633"
        },
        {
            "name": "Sprite",
            "category": "Food/beverages",
            "id": "66681829158"
        },
        {
            "name": "Diet Coke",
            "category": "Food/beverages",
            "id": "8605796091"
        }
    ],
    "paging": {
        "next": "https://graph.facebook.com/40796308305/likes?access_token=[redacted]&limit=5000&offset=5000&__after_id=8605796091"
    }
}
```

So now we’ve connected, authenticated and successfully retrieved some information from the Graph API. How can we make use of this information with the help of google-gson? That’ll be the topic of a separate article!

Thanks for reading!
