---
title: "COS: Implementing the Levenshtein Distance Algorithm"
date: "2013-08-01"
---

I was recently asked to help out a member of our Integration team with an issue they were having matching an entry in a pre-defined list of addresses against some free text that has come into our system from a customer – text that could contain slightly different lines or sections (such as postcodes), words missed out, or extra text such as ‘urgent: please send ASAP’.

I’d previously been working on implementing an Auto-suggestion field in one of our products, which has an overlap of requirements, and this led me to suggest calculating the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between the fields and using the result as one of the factors in identifying the best match. This algorithm provides a numeric value that represents the number of actions required to transform one word (or piece of text) to another, where an action is defined as an addition, deletion or substitution applied to a single character.
One of the few benefits of working with an obscure language such as Caché ObjectScript is that while there are a [whole host of readily-available implementations in a multitude of languages](https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance) available on the web, COS is not one of them. So I was able to take the opportunity to implement it myself, which was quite a fun aside.
