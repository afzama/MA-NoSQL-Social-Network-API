const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../Controllers/userController');

// /api/users
router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/update
router.route('/:userId/update')
    .post(updateUser)
    .delete(deleteUser);


module.exports = router;