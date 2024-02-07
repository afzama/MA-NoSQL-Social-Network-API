const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      // const userId = req.params.userId;
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: thought.thoughts } });
      res.json({ message: 'User thought(s) has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create users reactions
  async createReaction(req, res) {
    try {
      const { userId, thoughtId } = req.params;
      const {reactionBody} = req.body
      console.log('userId', userId, 'thoughtId', thoughtId)
      // const reaction = await Reaction.create({ reactionBody, username });
      // console.log(reaction);
      const user = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: { thoughtId } } },
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
      const { userId, thoughtId, reactionId } = req.params;
      console.log('userId', userId, 'thoughtId', thoughtId)
      const user = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );

      if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }

      if (!reactionId) {
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
