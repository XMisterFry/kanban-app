const mongoose = require ('mongoose')
const Schema = mongoose.Schema


let productsSchema = new Schema ({
name : {type : String,required :true}, 
category : { type : String, enum : ["In Stock", "Out of Stock", "Low Stock", "Purchase"], required : true},
});
const Products = mongoose.model ('Products', productsSchema)
module.exports = Products;    