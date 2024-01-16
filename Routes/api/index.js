const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/api/user', userRoutes);
router.use('/api/thought', thoughtRoutes);
router.use('/api/reaction', reactionRoutes);

module.exports = router;