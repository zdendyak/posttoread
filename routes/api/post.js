const express = require('express');
const router = express.Router();

const postController = require('../../controllers/post-controller');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.removePost);

module.exports = router;