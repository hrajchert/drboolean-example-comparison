const request = require('request');
const Task = require('data.task');
const Either = require('data.either');
const {eitherToTask} = require('./utils');

const httpGet = url =>
    new Task((rej, res) =>
        request(url, (error, response, body) =>
            error ? rej(error) : res(body)))
const first = xs =>
    Either.fromNullable(xs[0])

const parse = Either.try(JSON.parse)

const getJSON = url =>
    httpGet(url)
    .map(parse)
    .chain(eitherToTask)

const authHeader = token => ({Authorization: `Bearer ${token}`})

const findArtist = token => name =>
    getJSON({
        url: `https://api.spotify.com/v1/search?q=${name}&type=artist`,
        headers: authHeader(token)
    })
    .map(result => result.artists.items)
    .map(first)
    .chain(eitherToTask)

const relatedArtist = token => id =>
    getJSON({
        url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
        headers: authHeader(token)
    })
    .map(result => result.artists)

module.exports = {findArtist, relatedArtist}