const router = require('express').Router();
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');

router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;