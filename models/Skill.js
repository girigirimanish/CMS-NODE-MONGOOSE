const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide skill name'],
        maxlength:50
    },
    image:{
        type:Object,
        required:[true,'Please provide skill image.url'],
        url:{
            type:String,
        }
    },
    progress:{
        type:Number,
        required:[true,'Please provide skill progress']
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

module.exports = mongoose.model('Skill',SkillSchema)
