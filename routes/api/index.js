const postRouter = require('./post');
const router = require('express').Router();

router.use('/posts', postRouter);


module.exports = router;
