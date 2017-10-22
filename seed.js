const db = require('./db').db;
const Marker = require('./db').Marker;
const Promise = require('bluebird')


// randomize long and lat
const markers =  [];
db.sync({force: true})
  .then(() => {
    let i = 0;
    while(i < 500){
      markers.push({lat: +(Math.random() * (180 - (-180)) - 180).toFixed(4), long: +(Math.random() * (180 - (-180)) - 180).toFixed(4)})
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
