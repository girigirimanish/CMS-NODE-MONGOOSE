const Social = require('../models/Social')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllSocials = async (req, res) => {
    const socials = await Social.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ socials, count: socials.length })
}

const getSocial = async (req, res) => {
    const {
        user: { userId },
        params: { id: socialId }
    } = req

    const social = await Social.findOne({
        _id: socialId,
        createdBy: userId
    })
    if (!social) {
        throw new NotFoundError(`No Social found with id ${socialId}`)
    }
    res.status(StatusCodes.OK).json({ social })
}

const createSocial = async (req, res) => {
    req.body.createdBy = req.user.userId

    const social = await Social.create(req.body)
    res.status(StatusCodes.CREATED).json({ social })
}

const updateSocial = async (req, res) => {
    const {
        body: { title, url},
        user: { userId },
        params: { id: socialId }
    } = req

    if (title === '' || url === '') {
        throw new BadRequestError('Title or Url Fields cannot be empty')
    }

    const social = await Social.findOneAndUpdate(
        { _id: socialId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!social) {
        throw new NotFoundError(`No Social found with id ${socialId}`)
    }

    res.status(StatusCodes.OK).json({ social })
}

const deleteSocial = async (req, res) => {
    const {
        user: { userId },
        params: { id: socialId }
    } = req

    const social = await Social.findOneAndRemove({
        _id: socialId,
        createdBy: userId
    })

    if (!social) {
        throw new NotFoundError(`No Social found with id ${socialId}`)
    }
    res.status(StatusCodes.OK).send('Delete Success')
}

module.exports = {
    getAllSocials,
    getSocial,
    createSocial,
    updateSocial,
    deleteSocial
}