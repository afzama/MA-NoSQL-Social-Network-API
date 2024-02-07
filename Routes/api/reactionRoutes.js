const router = require('express').Router();
const {
    getReaction,
    createReaction,
    updateReaction,
    deleteReaction 
} = require('../../Controllers/reactionController');

// /api/users/:userId/thoughts/:thoughtId/reactions
router
  .route('/:userId/thoughts/:thoughtId/reactions')
  .get(getReaction)
  .post(createReaction);

// /api/reaction/:userId/reactions/:reactionId/update
router.route('/:userId/reactions/:reactionId/update').post(updateReaction);

// /api/users/:userId/reactions/:reactionId/delete
router.route('/:userId/reactions/:reactionId/delete').post(deleteReaction)

module.exports = router;