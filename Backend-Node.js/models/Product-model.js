const mongoose = require("mongoose");


const Product=new mongoose.Schema({
    name: {type: String, required:true},
    price:{type: Number, required:true},
    description: {type: String, required:true},
    quantity: {type:Number, required:true},
    uniqueness: {type:String, required: true},
    category: {type: String, required: true},
    picture: {type:String}
    
})
module.exports = mongoose.model('Product', Product);
