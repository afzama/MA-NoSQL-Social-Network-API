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
            const user = await User.findOne({_id:req.params.userId})
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
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update a user
    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: {username: req.body.username } },
                {runValidators: true, new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({message: 'No user found with that name :('});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete a user and remove 
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({_id:req.params.userId});

            if (!user) {
                return res.status(404).json({message: 'No such user exists'});
            }

            const thought = await Thought.updateMany(
                { users: req.params.userId},
                { $pull: {users: req.params.userId} },
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
  }