const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../../controllers/Thoughtcontroller');

// /api/Users
router.route('/').get(getAllThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/profile')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
