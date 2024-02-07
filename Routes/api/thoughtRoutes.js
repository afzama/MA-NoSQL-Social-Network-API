const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getReaction,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');


// Get all thoughts & post for a user
router.route('/').get(getThoughts).post(createThought);

// Get a single thought for a user
router.route('/:thoughtId').get(getSingleThought);

// Update & Delete a single thought for a user
router.route('/:thoughtId/update')
  .post(updateThought)
  .delete(deleteThought);

// Get a user's reaction to a single thought and delete reaction
router.route('/:userId/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//Get a user's thought and create a reaction
router.route('/:userId/thoughts/:thoughtId/reactions')
  .get(getReaction)
  .post(createReaction);

module.exports = router;