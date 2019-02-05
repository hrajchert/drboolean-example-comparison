const Task = require('data.task');
const {eitherToTask} = require('./utils');
const Spotify = require('./spotify');
const Either = require('data.either');

const argv = new Task((rej, res) => res(process.argv));
const names = argv.map(args => args.slice(2));

const Intersection = xs =>
({
    xs,
    concat: ({xs: ys}) =>
        Intersection(xs.filter(x => ys.some(y => x === y)))
})

const env = new Task((rej, res) => res(process.env))
const envToken = env
                .map(e => Either.fromNullable(e['TOKEN']))
                .chain(eitherToTask)

const related = token => name =>
    Spotify.findArtist(token)(name)
    .map(artist => artist.id)
    .chain(Spotify.relatedArtist(token))
    .map(artists => artists.map(a => a.name))


const relatedArtist = rels1 => rels2 =>
    Intersection(rels1).concat(Intersection(rels2)).xs

const main = token => ([name1, name2]) =>
    Task.of(relatedArtist)
    .ap(related(token)(name1))
    .ap(related(token)(name2))

envToken.chain(token => names.chain(main(token))).fork(
    err => console.error('buu', err),
    res => console.log('wii', res)
);