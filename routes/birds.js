const express = require('express')
const router = express.Router()
const knex = require('../db/knex')

function Bird() { return knex('bird') }
function Location() { return knex('location') }

// ********************************************* READ
//GET ALL BIRDS
router.get('/bird', (req, res) => {
  knex('bird')
  .join('location','bird.location_id','location.id')
  .select('bird.*','location.area')
  .orderBy('location.area', 'asc')
  .orderBy('bird.name', 'asc')
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

//GET ONE BIRD
router.get('/bird/:id', (req, res) => {
  Bird().where('id', req.params.id).first()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

//GET ALL LOCATIONS
router.get('/location', (req, res) => {
  Location().select().orderBy('name', 'asc')
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

//GET ONE LOCATION
router.get('/location/:id', (req, res) => {
  Location().where('id', req.params.id)
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// ********************************************* CREATE
// CREATE BIRD
router.post('/bird/', (req, res) => {

  var locationID

  knex('location').where('area', req.body.location).select('id')
  .then( result => {
    // LOCATION HAS BEEN FOUND
    // CREATE BIRD
    console.log('Location found, creating bird...')
    locationID = result[0].id
    return Bird().insert({
      location_id: locationID,
      name: req.body.name,
      rating: req.body.rating,
      notes: req.body.notes
    }, ['name','rating','location_id','notes'])
    .then( result => {
      res.json(result)
    })
  })
  .catch( result => {
    // LOCATION HAS NOT BEEN FOUND
    // CREATE LOCATION
    // CREATE BIRD
    console.log('Location NOT found, creating bird...')
    knex('location').insert({area: req.body.location},'id')
    .then( result => {
      return Bird().insert({
        location_id: result[0],
        name: req.body.name,
        rating: req.body.rating,
        notes: req.body.notes
      }, ['name','rating','location_id','notes'])
    })
    .then( result => {
      res.json(result)
    })
  })
})

// ********************************************* UPDATE
// UPDATE BIRD
router.put('/bird/:id', (req, res) => {
  Bird().where('id',req.params.id).update({
    name: req.body.name,
    rating: req.body.rating,
    location_id: req.body.location_id,
    notes: req.body.notes
  }, ['name','rating','location_id','notes'])
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})
// UPDATE LOCATION
router.put('/location/:id', (req, res) => {
  Location().where('id', req.params.id).update({
    name: req.body.name
  }, ['id','name'])
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// ********************************************* DELETE
// DELETE BIRD
router.delete('/bird/:id', (req, res) => {
  Bird().where('id', req.params.id).del(['id','name'])
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// DELETE LOCATION
router.delete('/location/:id', (req, res) => {
  Location().where('id', req.params.id).del(['id','name'])
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
