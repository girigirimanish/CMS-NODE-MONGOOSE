const express = require ('express')
const router = express.Router()

const{
    getAllSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skills')

router.route('/').post(createSkill).get(getAllSkills)

router.route('/:id').get(getSkill).delete(deleteSkill).patch(updateSkill)

module.exports = router