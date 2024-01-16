const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

//Post a thought
// router.post('/', (req,res)=>{

// })

// Get all thoughts for a user
router.route('/user/:userId/thoughts').get(getThoughts);

// Create a new thought for a user
router.route('/user/:userId/thoughts').post(createThought);

// Get a single thought for a user
router.route('/user/:userId/thought/:thoughtId').get(getSingleThought);

// Update a single thought for a user
router.route('/user/:userId/thought/:thoughtId').put(updateThought);

// Delete a single thought for a user
router.route('/user/:userId/thought/:thoughtId').delete(deleteThought);
module.exports = router;