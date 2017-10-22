const db = require('./db').db;
const Marker = require('./db').Marker;
const Promise = require('bluebird')
const markers =  [];

db.sync({force: true})
  .then(() => {
    let i = 0;
    while(i < 500){ // adding markers in the same hemisphere
      markers.push({lat: +(Math.random() * (45 - 44) + 44).toFixed(4), long: +(Math.random() * (-80 + 82) - 80).toFixed(4)})
      i++
    }
    return markers
  })
  .then(markers => 
    Promise.map(markers, marker => {
      return Marker.create({lat: marker.lat, long: marker.long, point: {type: 'Point', coordinates: [marker.lat, marker.long]}})
    })
  )
  .then((results) => {
    console.log(`Seeded ${results.length} new markers`)
  })
  .catch(console.error)