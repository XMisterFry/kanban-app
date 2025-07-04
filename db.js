const mongoose = require ('mongoose')
const Schema = mongoose.Schema


let productsSchema = new Schema ({
name : {type : String,required :true}, 
category : { type : String, enum : ["In Stock", "Out of Stock", "Low Stock", "Purchase"], required : true},
});

let usersSchema = new Schema ({
    name : {type: String},
    email: {type: String, required : true},
    password : {type : String, required: true}
    
})
const Products = mongoose.model ('Products', productsSchema)
const Users = mongoose.model ("Users",usersSchema)
module.exports = {Products, Users};    