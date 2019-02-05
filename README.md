Functional Comparison
=====================

If you haven't watch Dr Booleans course on egghead about [Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript) you should, I strongly recommend it, and it's free 🎉. The course clearly explains complex concepts about FP such as Functor, Semigroups and Monads in a very simple and practical way. The final example is a console app that given some band names, looks in the Spotify API for the related artist and returns the common bands.

The objective of this repository is to compare how different implementations of the same algorithm works in JavaScript, PureScript and TypeScript (using fp-ts).

# Spotify Token
Since drboolean's video the API changed and now requires a Token to search and seek Artist information. You can create an app in the [Spotify Dashboard](https://developer.spotify.com/dashboard/applications) and get the `client_id` and `secret`.

To get a TOKEN out of it you should first create a base64 concatenation of the string `<client_id>:<secret>` using the btoa function in a JavaScript console, for example

```javascript
const base64 = btoa("3d1c68c7a...:e99ff30...") // M2...YWE=
```

And last, you get a token using curl

```bash
curl -X "POST" -H "Authorization: Basic M2...YWE=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

```

That will give you a temporary token that you can use to query the Spotify API for a couple of hours. When it expires, you can do the `curl` again.

# JavaScript
To execute the JavaScript example you need to pass the TOKEN as an env variable, and two arguments like this

```bash
TOKEN=BQAs... node ./src/js oasis blur
```