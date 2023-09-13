const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const breadSeed = require('../seeds/bread-seed.js')
const Baker = require('../models/baker.js')

/// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean() 
  const foundBreads = await Bread.find().limit(2).lean() 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})




//better format beneath but missing title
// Bread
//         .find()
//         .then(function(breads) {
//             res.render(
//                 'Index',
//                 {
//                     breads: breads,
//                 }
//             )
//         })
// Bread
//         .getAllBakedBy("Ross")
//         .then(function(breads) {
//             res.render(
//                 'Index',
//                 {
//                     breads: breads,
//                 }
//             )
//         })})

// in the new route
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
      })
})

// SHOW
breads.get('/:id', (req, res) => {
  if (req.params.id) {
      Bread
          .findById(req.params.id)
          .populate("baker")
          .then(bread => {
              res.render(
                  'Show',
                  {
                      bread: bread,
                      id: req.params.id
                  })
          })
          .catch(err => {
              console.log(err)
              res.render('NotFound')
          })
  } else {
      res.render('NotFound')
  }
  //res.send(Bread[req.params.arrayIndex])
})


// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread
      .create(req.body)
      .then(createdBread => {
        res.redirect('/breads')
      })
      .catch(err => {
        res.send(err)
  })
})


// DELETE
breads.delete('/:id', (req, res) => {
  if (req.params.id) {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
} else {
  res.render('NotFound')
}
})


// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker
      .find()
      .then(foundBakers =>{
        if (req.params.id) {
        Bread
        .findById(req.params.id) 
        .populate("baker")
          .then(bread => { 
            res.render(
              'edit',
             {
              bread: bread,
              bakers: foundBakers 
            })
          })
        } else {
          res.render('NotFound')
        }
        })})
  



// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})

breads.get('/data/seed', (req, res) => {
  Bread.insertMany(breadSeed)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})


module.exports = breads
