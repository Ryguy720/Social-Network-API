const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../../controllers/Usercontroller');

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/courses/:courseId
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
