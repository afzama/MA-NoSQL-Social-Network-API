const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getReaction, 
} = require('../../Controllers/userController');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/update
router.route('/:userId/update').post(updateUser);

// /api/user/:userId/reaction
router.route('/userId/reaction/reactionId').post(getReaction);


module.exports = router;