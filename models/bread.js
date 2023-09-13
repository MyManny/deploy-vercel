// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'http://placehold.it/500x500.png' },
    baker: {
      type: Schema.Types.ObjectId,
      ref: 'Baker'
    } 
})
 
//instance method 
// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}


//static
breadSchema.statics.getAllBakedBy = function(bakerName){
  return this.find({baker: bakerName})
}
// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread