const router = require('express').Router();
const userRoutes = require('./api/Userroutes');
const thoughtRoutes = require('./api/thoughtRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;
