const { ObjectId } = require('mongoose').Types;
const { User, Reaction } = require('../models');

module.exports = {
    //Create users reactions 
    async createReaction(req,res) {
        try {
            const { userId, thoughtId } = req.params;
            const { reactionBody, username } = req.body;

            const reaction = await Reaction.create({reactionBody, username});

            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { thoughts: thoughtId, reactions: reaction._id } },
                { new: true }
              );
            res.json(user);
            } catch (err) {
            res.status(500).json(err);
            }
        },
    //Get a user's reaction
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
    //Update user reaction
    async updateReaction(req, res) {
        try {
          const { userId, reactionId } = req.params;
          const { reactionBody } = req.body;
      
          const reaction = await Reaction.findOneAndUpdate(
            { _id: reactionId },
            { reactionBody },
            { new: true }
          );
      
          res.json(reaction);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    //Delete users reaction
    async deleteReaction(req, res) {
        try {
          const { userId, reactionId } = req.params;
      
          // Find the user by their userId and remove the reaction from their reactions array
          const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { reactions: reactionId } },
            { new: true }
          );
      
          // Delete the reaction from the Reaction collection
          const reaction = await Reaction.findOneAndDelete({ _id: reactionId });
      
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}