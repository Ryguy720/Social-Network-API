const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  getAllUsers(req, res) {
    User.find()
      .then(userdata => {
        return res.json(userdata);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then(userdata =>
        res.json(userdata)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((userdata) => res.json(userdata))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then(userdata =>
        !userdata
          ? res.status(404).json({ message: 'No such User exists' })
          : Thought.deleteMany({ _id: { $in: userdata.thoughts } }

          )
      )
      .then((deletedUser) =>

        res.status(200).json({
          message: 'User and Thoughts deleted.',
          deletedUser
        })

      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id }, { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(userdata =>
        !userdata
          ? res
            .status(404)
            .json({ message: 'No student found with that ID :(' })
          : res.json(userdata)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a friend to user
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.id },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true })
    .then((userdata) => res.json(userdata))
    .catch(err => res.status(400).json({err : err.message}))
},

// remove a friend from user 
removeFriend(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
    .then(userdata => res. status(200).json(userdata).json(user204Message(params.friendId, 'User')))
    .catch(err => res.json({err : err.message}))
}

};


