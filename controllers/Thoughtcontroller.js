const { User, Thought } = require('../models');

module.exports = {
  // Get all Thoughts
  // getAllThoughts(req, res) {
  //   Thought.find({})
  //     .then(thoughtdata => {
  //       return res.json(thoughtdata);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  getAllThoughts(req, res) {
    //populate thought data with verison and send a response back
    Thought.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(thoughtdata => res.json(thoughtdata))
      .catch(err => res.status(500).json({ err: err.message }))
  },
  // Get a single Thought
  getThought(req, res) {
    console.log(req.params.id)
    Thought.findOne({ _id: req.params.id })
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
    Thought.findOneAndRemove({ _id: req.params.id })
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


  createReaction({ params, body }, res) {
    console.log(body)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true })
      .populate("reactions")
      .select("-__v")
      .then((thoughtdata) =>
        !thoughtdata
          ? res
            .status(404)
            .json({ message: "No thought found with this ID" })
          : res.json(thoughtdata)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a reaction from thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id },
      { $pull: { reactions: { _id: req.params.id } } },
      { new: true })
      .then((thought) => !thought ? res.status(404).json({ message: "No thought found with this ID" }) : res.json(thought)).catch((err) => res.status(500).json(err));
  },
};