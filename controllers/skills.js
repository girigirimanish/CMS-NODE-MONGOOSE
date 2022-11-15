const Skill = require('../models/Skill')
const {StatusCodes} =  require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllSkills = async (req,res) =>{
    const skills = await Skill.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({skills, count:jobs.length})
}

const getSkill = async (req,res) =>{
    const{
        user:{userId},
        params:{id:skillId}
    } = req

    const skill = await Job.findOne({
        _id:skillId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No Skill found with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({skill})
}

const createSkill = async (req,res) =>{
    req.body.createdBy = req.user.userId

    const skill = await Skill.create(req.body)
    res.status(StatusCodes.CREATED).json({skill})
}

const updateSkill = async (req,res) =>{
    const{
        body:{title,url,progress},
        user:{userId},
        params:{id:skillId}
    } = req

    if(title==='' || url===''|| progress===''){
        throw new BadRequestError('Title,Url or Progress Fields cannot be empty')
    }

    const skill = await Skill.findOneAndUpdate(
        {_id:skillId,createdBy:userId},
        req.body,
        {new:true,runValidators:true}
    )

    if(!skill){
        throw new NotFoundError(`No Job found with id ${skillId}`)
    }

    res.status(StatusCodes.OK).json({skill})
}

const deleteSkill = async (req,res) =>{
    const{
        user:{userId},
        params:{id:skillId}
    } = req

    const skill = await Skill.findOneAndRemove({
        _id:skillId,
        createdBy:userId
    })

    if(!skill){
        throw new NotFoundError(`No Job found with id ${skillId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports ={
    getAllSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill
}