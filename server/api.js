const api = module.exports = require('express').Router()

api
    .use('/markers', require('./markers'))
    .use((req, res) => res.status(404).end())