Functional Language Comparison
==============================

If you haven't watch Dr Booleans course on egghead about [Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript) you should, I strongly recommend it, and it's free 🎉. The course clearly explains complex concepts about FP such as Functor, Semigroups and Monads in a very simple and practical way. The final example is a console app that given some band names, looks in the Spotify API for the related artist and returns the **common related artist**.

The objective of this repository is to compare how can we write this program in three diferent languages (JavaScript, PureScript and TypeScript) using the same algorithm.

# Running the app

## Spotify Token
Spotify API changed since drboolean's video, and now requires an `Access Token` to search and seek Artist information. To get the token you need to create an app in the [Spotify Dashboard](https://developer.spotify.com/dashboard/applications) and get an `client_id` and `secret`.

Then you should create a *base64* concatenation of the string `<client_id>:<secret>` using the btoa function. You can do this in any JavaScript console, for example

```javascript
const base64 = btoa("3d1c68c7a...:e99ff30...") // M2...YWE=
```

You can use the *base64* string to get an `Access Token` with the following `curl` command

```bash
curl -X "POST" -H "Authorization: Basic M2...YWE=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

```

That will give you a temporary token that you can use to query the Spotify API for a couple of hours. When it expires, you can do the `curl` again.

## JavaScript
To execute the JavaScript example you need to pass the **TOKEN** as an env variable, and the two artist to compare, like this

```bash
TOKEN=BQAs... node ./src/js oasis blur
```
