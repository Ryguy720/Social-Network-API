const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },

    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    thoughts: [{
      type: Schema.Types.ObjectId, 
      ref: 'Thought'
    }], //Are these ID values?

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],  //Are these ID values?
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

// Create a virtual property `friendCount` that gets the length of users friends array.
userSchema
  .virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;
