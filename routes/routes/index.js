const router = require('express').Router();
const userRoutes = require('./api/Userroutes');
const thoughtRoutes = require('./api/thoughtRoutes');

router.use('/courses', userRoutes);
router.use('/students', thoughtRoutes);

module.exports = router;
