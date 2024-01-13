const router = require('express').Router();
const {
    getFriend,
    getFriends,
    addFriend,
    removeFriend,
} = require('../../Controllers/userController');

// /api/user/:userId/friends
router.route('/:userId/friends').get(getFriends);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId').get(getFriend).delete(removeFriend);

module.exports = router;