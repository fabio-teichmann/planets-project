const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
    // connect streams (parse === destination of source)
    // readable.pipe(writable)
    .pipe(parse({
        comment: '#',
        // to return rows in JS object form
        columns: true,
    }))
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results); 
        console.log('done');
    });
// returns event emitter
// parse();