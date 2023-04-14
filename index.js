const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    // criteria based on https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
    return planet['koi_disposition'] === 'CONFIRMED'
        // stellar flux as another criteria for habitable planets
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        // planet size should be below x1.6 earth radii
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    // connect streams (parse === destination of source)
    // readable.pipe(writable)
    .pipe(parse({
        comment: '#',
        // to return rows in JS object form
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`); 
        console.log('done');
    });
// returns event emitter
// parse();