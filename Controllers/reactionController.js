const { ObjectId } = require('mongoose').Types;
const { User, Reaction, Thought } = require('../models');

module.exports = {
  // Create users reactions
  async createReaction(req, res) {
    try {
      const { userId, thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      console.log('userId', userId, 'thoughtId', thoughtId)
      // const reaction = await Reaction.create({ reactionBody, username });
      // console.log(reaction);
      const user = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      // console.log(user)
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error('Error creating reaction:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get a user's reaction
  async getReaction(req, res) {
    try {
      const reactions = await Reaction.find();
      const reactionObj = {
        reactions,
        username: await username
      };
      console.log('userId', userId, 'thoughtId', thoughtId)
      res.json(reactionObj);
    } catch (err) {
      console.error('Error getting reactions:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update user reaction
  async updateReaction(req, res) {
    try {
      const { userId, reactionId } = req.params;
      const { reactionBody } = req.body;

      const reaction = await Reaction.findOneAndUpdate(
        { _id: reactionId },
        { reactionBody },
        { new: true }
      );

      if (!reaction) {
        console.log('Reaction not found');
        return res.status(404).json({ error: 'Reaction not found' });
      }

      res.json(reaction);
    } catch (err) {
      console.error('Error updating reaction:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete users reaction
  async deleteReaction(req, res) {
    try {
      const { userId, thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      console.log('userId', userId, 'thoughtId', thoughtId)
      const user = await User.findbyIdAndUpdate(
        userId,
        { $pull: { reactions: reactionBody } },
        { new: true }
      );

      if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }

      if (!reactionBody) {
        console.log('Reaction not found');
        return res.status(404).json({ error: 'Reaction not found' });
      } console.log('No reaction with that Id')
      res.json(user);
    } catch (err) {
      console.error('Error deleting reaction:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
