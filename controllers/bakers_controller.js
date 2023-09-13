// dependencies
const express = require('express')
const bakers = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../seeds/baker_seed.js')

// Index:  
bakers.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})                    
         
// Show: 
bakers.get('/:id', (req, res) => {
    Baker
        .findById(req.params.id)
        .populate({
            path: "breads",
            options: { limit: 2}
        })
        .then(foundBaker => {
            res.render('BakerShow', {
                baker: foundBaker
            })
        })
})

// delete
bakers.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})


//seed
bakers.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})


// export
module.exports = bakers                    
