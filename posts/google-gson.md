---
title: "Java: Parsing JSON with Google’s Gson Library"
date: "2012-12-30"
---

This post serves as a follow-up to [A Simple REST Client](./rest-client-template), in which a basic REST client for the Facebook Graph API was created. In this post, a few examples will show how to get started with Gson by doing some simple parsing of JSON (JavaScript Object Notation) returned by the Facebook Client.

### Pre-requisites

[Google-gson](https://github.com/google/gson)

### JSON Parser

In order to be able to pass the data around in a more object-oriented manner, I first created an object to represent (a small part of) a Facebook Object:

```java
package org.chrise.facebook.model;
 
public class FacebookObject
{
    private final String name;
    private final String id;
 
    public FacebookObject(String name, String id)
    {
        this.name = name;
        this.id = id;
    }
 
    public String getName()
    {
        return name;
    }
 
    public String getId()
    {
        return id;
    }
 
    @Override
    public String toString()
    {
        return name + ", " + id;
    }
}
```

This is a simple class that contains only the fields that I needed for manipulating Facebook Objects in this example, i.e. `name` and `id`.
Next comes the controller class that does the actual parsing with Gson. This is the constructor:

```java
public class Facebook
{
    private static final String MEMBER_NAME = "name";
    private static final String MEMBER_ID = "id";
    private static final String MEMBER_DATA = "data";
 
    private FacebookClient client;
    private JsonParser parser;
 
    public Facebook() throws KeyManagementException, NoSuchAlgorithmException
    {
        try
        {
            client = new FacebookClient();
            parser = new JsonParser();
        }
        catch (KeyManagementException | NoSuchAlgorithmException e)
        {
            client = null;
            parser = null;
 
            throw e;
        }
    }
}
```

The two global references are to the REST client object and one to a `JsonParser`, which as its name suggests, facilitates creating Gson objects from the raw Strings returned from the client’s methods.

Below are a few methods that show what can be done with the library.
 
### Method: getNameForId()

```java
public String getNameForId(String id)
{
    // Perform the API request and parse the data.
    String data = client.getObjectProperties(id);
    JsonObject json = (JsonObject)parser.parse(data);
 
    // Confirm that the member exists.
    return ((json.has(MEMBER_NAME)) ? json.get(MEMBER_NAME).getAsString() : "");
}
```
This is a method that takes in an id of a Facebook Object and returns the name if the object exists, else an empty String. As a reminder, the format of the data returned from Facebook is as follows:

```
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
This is a standard JSON object with seven key-value pairs. Thus we see that the data parsed with the `JsonParser` is cast as a `JsonObject` with the following line:

```java
JsonObject json = (JsonObject)parser.parse(data);
```

By examining the [documentation](https://static.javadoc.io/com.google.code.gson/gson/2.8.5/com/google/gson/JsonObject.html) of `JsonObject` we can see there are `has` and `get` methods, for checking whether a pair exists and retrieving the value for a key respectively. Thus we can say if the key “name” exists, retrieve its value:

```java
return ((json.has(MEMBER_NAME)) ? json.get(MEMBER_NAME).getAsString() : "");
```

Get returns a [JsonElement](https://static.javadoc.io/com.google.code.gson/gson/2.8.5/com/google/gson/JsonElement.html) object; by calling `getAsString()` on this, we can retrieve the value in String format (which in this case strips the quotation marks from the value, and would transform it to a String if it were e.g. an int or boolean).

### Method: getLikes()

```java
public List<facebookobject> getLikes(String id)
{
    final List<facebookobject> result = new ArrayList<>();
 
    // client.getObjectLikes requires authentication.
    if (!client.isAuthenticated())
        client.authenticate();
 
    // Perform the API request and parse the data.
    String data = client.getObjectLikes(id);
    JsonObject json = (JsonObject)parser.parse(data);
    JsonArray dataArray = json.getAsJsonArray(MEMBER_DATA);
 
    // Loop through each Facebook object and add its name to the list.
    for (JsonElement e : dataArray)
    {
        JsonObject o = e.getAsJsonObject();
 
        // Confirm that the members exist.
        String objectId = ((o.has(MEMBER_ID)) ? o.get(MEMBER_ID).getAsString() : "");
        String objectName = ((o.has(MEMBER_NAME)) ? o.get(MEMBER_NAME).getAsString() : "");
 
        result.add(new FacebookObject(objectId, objectName));
    }
 
    return result;
}
```

This method takes in a Facebook Object id and returns its likes as a `List` of `FacebookObject`s. Recall that due to security limitations, this method only functions for public pages.
Data is returned in the following format:

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
    "next": "https://graph.facebook.com/40796308305/likes?access_token=[redacted]&limit=5000&offset=5000&__after_id=8605796091",
  }
}
```

The JSON array, marked by `[` and `]`, is the information that needs to be extracted in this case.
The String is cast to a `JsonObject` as normal, and then a method is called to retrieve the value of “data”, which is the array.

```java
JsonArray dataArray = json.getAsJsonArray(MEMBER_DATA);
```

`JsonArray` implements `Iterable`, which means we can use the enhanced for loop construct to loop through each item.
From looking at the data, we can see that the values of “data” don’t have any nested values, so they can themselves be cast as `JsonObject`s. After that its just a case of extracting and returning the relevant data.

### Method: getSixDegrees()

Next is something a little more interesting. Building upon the previous example, this next method attempts to iterate through six degrees of likes. If ever a page is reached that doesn’t return any likes, null objects are returned for the remaining entries.

```java
public FacebookObject[] getSixDegrees(String id)
{
    final FacebookObject[] result = new FacebookObject[6];
    final Random randomGenerator = new Random();
 
    // Loop through up to 6 FacebookObjects, tracking their id for the next iteration.
    for (int i = 0; i < 6; i++)
    {
        List<facebookobject> likes = this.getLikes(id);
 
        // Quit out if a dead end is reached.
        if (likes.isEmpty()) 
            break;
 
        // Get a random like. Passing 0 to nextInt() is not allowed.
        FacebookObject degree = likes.size() == 1 ? 
                                likes.get(0) : 
                                likes.get(randomGenerator.nextInt(likes.size() - 1));
 
        id = degree.getId(); // Prepare for the next loop.
        result[i] = degree;
    }
 
    return result;
}
```

### Results

Putting it all together, here’s a Main class that runs all of the above methods.

```java
public class Main
{
    private static Facebook facebook;
 
    public static void main(String[] args)
    {
        try
        {
            facebook = new Facebook();
 
            Main.runNameQuery();
            Main.runLikesQuery();
            Main.runDegreesQuery();
        }
        catch (KeyManagementException | NoSuchAlgorithmException e)
        {
            System.err.println("Failed to create Facebook client. Cause: " + e.getMessage());
        }
    }
 
    private static void runNameQuery()
    {
        System.out.println(facebook.getNameForId("ceva24"));
    }
 
    private static void runLikesQuery()
    {
        for (FacebookObject like : facebook.getLikes("cocacola"))
            System.out.println(like);
    }
 
    private static void runDegreesQuery()
    {
        FacebookObject[] degrees = facebook.getSixDegrees("cocacola");
 
        for (int i = 0; i < 6; i++)
        {
            FacebookObject o = degrees[i]; 
 
            if (o == null)
            {
                String suffix;
                switch (i)
                {
                    case 1  : suffix = "st"; break;
                    case 2  : suffix = "nd"; break;
                    case 3  : suffix = "rd"; break;
                    default : suffix = "th";
                }
 
                System.out.println("You only reached the "
                        + (i) + suffix + " degree! Better luck next time!");
                break;
            }
            else
            {
                System.out.println(o);
            }
        }
    }
}
```

And the results:

```
Christian Evans
 
123355014367126, Atlanta Food & Wine Festival
69421318512, Six Flags Great Adventure
32237381874, Kings Dominion
42125257610, ESSENCE Music Festival
6243987495, Spotify
287552055150, Coca-Cola light
61124008229, Coca-Cola Zero
23550666633, Fanta
66681829158, Sprite
8605796091, Diet Coke
5120148605, will.i.am
 
6243987495, Spotify
77589292295, Chevrolet
8280904159, Eli Manning
 
You only reached the 3rd degree! Better luck next time!
```

And there we have it. Hopefully this post has given some insight into how to parse JSON in an object-oriented manner using Google’s Gson library.

Thanks for reading!

Update: Source files are now on [Github](https://github.com/Ceva24/facebook-client), along with corresponding unit tests.