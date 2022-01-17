const { User, Thought } = require('../models');

module.exports = {
  // Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then(thoughtdata => {
        return res.json(thoughtdata);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single Thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then(thoughtdata =>
        res.json(thoughtdata)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtdata) => res.json(thoughtdata))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and thoughts
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(thoughtdata =>
        !thoughtdata
          ? res.status(404).json({ message: 'No such Thought exists' })
          : Thought.deleteMany({ _id: { $in: thoughtdata.thoughts } }

          )
      )
      .then((deletedThought) =>

        res.status(200).json({
          message: 'User and Thoughts deleted.',
          deletedThought
        })

      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update User
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { runValidators: true, new: true }
    )
      .then(thoughtdata =>
        !thoughtdata
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(thoughtdata)
      )
      .catch((err) => res.status(500).json(err));
  },


};