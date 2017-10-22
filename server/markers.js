const db = require('../db').db;
const Marker = require('../db').Marker;
const Sequelize = require('sequelize');

module.exports = require('express').Router()
  .get('/', // get all marker information
    (req, res, next) =>
      Marker.findAll({})
      .then(markers => res.send(markers))
      .catch(next))
  .get('/:markerId', // get single marker information
    (req, res, next) =>
      Marker.findById(req.params.markerId)
      .then(marker => res.send(marker))
      .catch(next))
  .get('/nearby/:markerId/',
  (req, res, next) => // get surrounding markers by user specified radius
  {
    Marker.findById(req.params.markerId)
    .then(marker => marker.findNearby(req.body.radius))
    .then(markers => res.send(markers))
    .catch(next)
  })
   .post('/new', // create new marker
    (req, res, next) =>
        Marker.create({
            long: req.body.long,
            lat: req.body.lat,
            altitutde: req.body.alt || null,
            point: {type: 'Point', coordinates: [req.body.lat, req.body.long]}            
        })
        .then(marker => res.send(marker))
        .catch(next))
        