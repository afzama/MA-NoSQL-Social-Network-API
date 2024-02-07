const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');


// Get all thoughts & post for a user
router.route('/').get(getThoughts).post(createThought);

// Get a single thought for a user
router.route('/:thoughtId').get(getSingleThought);

// Update & Delete a single thought for a user
router.route('/:thoughtId/update')
    .post(updateThought)
    .delete(deleteThought);

module.exports = router;