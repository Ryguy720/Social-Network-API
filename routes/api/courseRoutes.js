const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} = require('../../models/user');

// /api/courses
router.route('/').get(getAllUsers).post(createCourse);

// /api/courses/:courseId
router
  .route('../../models/user')
  .get(getUser)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
