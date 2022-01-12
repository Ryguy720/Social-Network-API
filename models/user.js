const { Schema, Model } = require('mongoose');
const { validate } = require('./Student');

const userName = new Schema(
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

    thoughts: [Thoughtschema], //Are these ID values?

    friends: [userName],  //Are these ID values?
   }
);

// Create a virtual property `friendCount` that gets the length of users friends array.
userName
  .virtual('friendCount').get(function () {
    return `${this.friends.length}`;
  });

const User = Model('username', userName);

module.exports = User;
