const { Schema, model, Types } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // validate: {
      //   validator: () => Promise.resolve(false),
      //   message: 'Email validation failed'
      // },
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
    ],
    reaction: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    strictPopulate: false,
  }
);

const User = model('User', userSchema);
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = User;
