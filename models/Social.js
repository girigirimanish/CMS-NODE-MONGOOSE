const mongoose = require('mongoose')

const SocialSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide social domain title'],
        maxlength:50
    },
    url:{
        type:String,
        required:[true,'Please provide image Url'],
    },
    type:{
        type:String,
        default:'Image',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Social',SocialSchema)
