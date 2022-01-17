const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/Usercontroller');

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/courses/:courseId
router
  .route('../../models/user')
  .get(getUser)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
