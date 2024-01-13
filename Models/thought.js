const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema(
  {
    thoughtText:
    {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt:
    {
      type: Date,
      default: Date.now(),
      get: (timestamp) => dateFormat(timestamp),
    },
    username:
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reactions: [reactionSchema],
  },
);

thoughtSchema.virtual('timestamp').get(function () {
  return new Date().toISOString();
});

//reactionCount virtual property will retrieve the length of the reactions array field for each thought document
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;