const db = require('../db').db;
const Marker = require('../db').Marker;
const Sequelize = require('sequelize');
const server = require('../server/start');

const chai = require('chai');

const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const supertest = require('supertest');
const sinon = require('sinon');

describe('Testing Markers', () => {

    beforeEach('Synchronize and clear database', () => db.sync({force: true}));

    after('Synchronize and clear database', () => db.sync({force: true}));

    let agent;
    beforeEach('Set up agent for testing', () => {
        agent = supertest(server);
    });

    let marker1;
    let marker2;
    let marker3;
    let marker4;

    beforeEach('Seed markers', () => {
        const NYCMarkers = [
            { // Grace Hopper Academy
                long: 40.7050,
                lat: -74.0091,
                altitude: 300,
                point: {type: 'Point', coordinates: [40.7050, -74.0091]} 
            },
            { // Leo's Bagels
                long: 40.7049,
                lat: -74.0097,
                altitude: 300,
                point: {type: 'Point', coordinates: [40.7049, -74.0097]} 
            },
            { // Sushi Place
                long: 40.7074,
                lat: -74.0111,
                altitude: 300,
                point: {type: 'Point', coordinates: [40.7074, -74.0111]} 
            },
            { // My apartment (~10 miles away)
                long: 40.81003,
                lat: -73.9432,
                altitude: 700,
                point: {type: 'Point', coordinates: [40.81003, -73.9432]} 
            },
        ];
        return Marker.bulkCreate(NYCMarkers, {returning: true})
            .then(createdMarkers => {
                marker1 = createdMarkers[0].dataValues.id;
                marker2 = createdMarkers[1].dataValues.id;
                marker3 = createdMarkers[2].dataValues.id;
                marker4 = createdMarkers[3].dataValues.id;
            });
    });


    it('gets all markers', () => {
        console.log('Added three markers in downtown NYC and one marker in uptown NYC')
        return agent
            .get('/markers/')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(4);
            });
    });

    it('gets all markers in a 1 mile radius', () => {
        return agent
            .get(`/markers/nearby/${marker2}`)
            .send({radius: 1609.34})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(3);
            });
    });

    it('adds a new marker on POST', () => {
        return agent
            .post('/markers/new')
            .send({ // a new New York marker:
                long: 40.7128,
                lat: 74.0060,
                altitude: 300
            })
            .expect(200)
            .then(res => {
                const newMarker = res.body;
                return Marker.findById(newMarker.id);
            })
            .then(newMarker => {
                expect(newMarker.long).to.be.equal(40.7128);
                expect(newMarker.lat).to.be.equal(74.0060);
            });

    });

});