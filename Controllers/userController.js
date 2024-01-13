const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  }

// Aggregate function for getting the users thoughts
const thought = async (userName) =>
  User.aggregate([
    {$match: {_id:new ObjectId(userName) } },
    {
        $unwind: '$thoughts',
    },
    {
        $group: {
            _id: new ObjectId(userName),
            overallThought: { $avg: '$thoughts.collect'},
        },
    },
  ]);

  module.exports = {
    //Get all users
    async getUser(req,res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //Get a single user
    async getSingleUser(req,res) {
        try {
            const user = await User.findOne({_id:req.params.userName})
                .select('-__v');

            if (!user) {
                return res.status(404).json({message: 'No user with that name'})
            }

            res.json({
                user,
                thought: await thought(req.params.userName),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //create a new user
    async createUser(req,res) {
        try {
            const user = await user.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update a user
    async updateUser(req,res) {
        try {
            const user = await User.findOneandUpdate(
                {_id: req.params.userName},
                {$addToSet: {user: req.body } },
                {runValidators: true, new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({message: 'Not user found with that name :('});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete a user and remove their thought
    async deleteUser(req,res) {
        try {
            const user = await User.findOneandRemove({_id:req.params.userName});

            if (!user) {
                return res.status(404).json({message: 'No such user exists'});
            }

            const thought = await Thought.findOneandRemove(
                { users: req.params.userName},
                { $pull: {users: req.params.userName} },
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found',
                });
            }

            res.json({ message: 'User successfully deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //Create users reactions 
    async createReaction(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Get a users reaction
    async getReaction(req,res) {
        try {
            const reaction = await Reaction.find();

            const reactionObj = {
                reaction,
                userName: await userName(),
            };

            res.json(reactionObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
  }