const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../../controllers/Usercontroller');

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/courses/:courseId
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

  // /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


module.exports = router;
