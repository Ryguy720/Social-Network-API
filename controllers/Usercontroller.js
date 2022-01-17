const { User, Thought } = require('../models');

const userController = {
    // Get all Users
    getallUsers(req, res) {
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
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
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
      User.findOneAndRemove({ _id: req.params.UserId })
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
  
    // Add an assignment to a student
    updateUser(req, res) {
      console.log('You are adding an assignment');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.Id },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      )
        .then((student) =>
          !student
            ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
            : res.json(student)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove assignment from a student
    removeAssignment(req, res) {
      Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      )
        .then((student) =>
          !student
            ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
            : res.json(student)
        )
        .catch((err) => res.status(500).json(err));
    },
  };