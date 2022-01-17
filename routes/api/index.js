const router = require('express').Router();
const userRoutes = require('./Users');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/courses', userRoutes);
router.use('/students', thoughtRoutes);

module.exports = router;
