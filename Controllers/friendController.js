const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

//Get a users friend
const getFriend = async (req,res) => {
        try {
            const friend = await Friend.find();

            const friendObj = {
                friend,
                userName: await userName(),
            };

            res.json(friendObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };
//add a friend
const addFriend = async (req,res) => {
    try {
        const {userId, friendId} = req.params;

        const user = await User.findbyIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId} },
            { new: true}
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
//remove a friend
const removeFriend = async (req, res) => {
    try {
        const {userId, friendId} = req.params;

        const user = await User.findbyIdAndUpdate(
            userId,
            { $pull: { friends: friendId} },
            { new: true}
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getFriend,
    addFriend,
    removeFriend
}
