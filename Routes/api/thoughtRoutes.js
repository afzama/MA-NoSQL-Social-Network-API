const router = require('express').Router();
const { createReaction } = require('../../Controllers/userController.js');
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction
} = require('../../controllers/thoughtController.js');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId/update
router.route('/:thoughtId/update').get(getSingleThought).put(updateThought)

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/user/:userId/thought
router.route('/:thoughtId').get(getSingleThought).post(createReaction)

module.exports = router;