const { Schema, model } = require('mongoose');
const thoughtSchema = require('./user');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date ,
      default: Date.now, 
      //Need getter method for timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('reactionCount').get(function () {
    return `${this.reactions.length}`;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;