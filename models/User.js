const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trimmed: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trimmed: true,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please use a valid email address'] // checks email validation (regex)
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
},
{
  toJSON: {
    virtuals: true
  }
}
);

const User = mongoose.model('user', userSchema)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


module.exports = User