const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide a value"],
    },
    category:{
        type:String
    },
    price:{
        type:Number,
        required:[true,"please provide a value"],
    },
    image:{
        type:String
    },
    description:{
        type:String,
        maxlength:300
    }
},{timestamps:true})

module.exports =mongoose.model("Product",productSchema)