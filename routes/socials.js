const express = require ('express')
const router = express.Router()

const{
    getAllSocials,
    getSocial,
    createSocial,
    updateSocial,
    deleteSocial
} = require('../controllers/socials')

router.route('/').post(createSocial).get(getAllSocials)

router.route('/:id').get(getSocial).delete(deleteSocial).patch(updateSocial)

module.exports = router