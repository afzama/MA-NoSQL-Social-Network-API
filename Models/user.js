const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
    },
    thoughts: [thoughtSchema],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
);

const User = db.model('User', userSchema);
const user = new User();

user.email = 'test@test.co';
user.username = 'test';

async function validateUser() {
  let error;
  try {
    await user.validate();
  } catch (err) {
    error = err;
  }
  assert.ok(error);
  assert.equal(error.errors['name'].message, 'Oops!');
  assert.equal(error.errors['email'].message, 'Email validation failed')
}

validateUser();

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = User;
