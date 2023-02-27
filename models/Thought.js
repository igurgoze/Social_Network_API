const mongoose = require('mongoose');
const dayjs = require('dayjs')

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAt => dayjs(createdAt).format('MMM DD, YYYY h:mm:ss a')
  }
},
{
  toJSON: {
    virtuals: true,
    getters:true
  },
}
)

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAt => dayjs(createdAt).format('MMM DD, YYYY h:mm:ss a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
}
)

const Thought = mongoose.model('thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = {Thought}