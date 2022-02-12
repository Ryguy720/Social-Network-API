const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require('../../../controllers/Thoughtcontroller');

// /api/Users
router.route('/').get(getAllThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:id')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

  router
.route('/:thoughtId/reactions')
  .post(createReaction);
console.log(createThought)

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;
