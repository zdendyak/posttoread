const Post = require('../models/post');

const getAllPosts = (req, res) => {
    Post.find({}).exec((err, posts) => {
        if (err) return res.status(400).json({ ok: false, message: 'Error occurred during fetching posts' });
        res.json({ ok: true, posts });
    });
}

const getPostById = (req, res) => {
    const id = req.params.id;
    Post.findById(id).exec((err, post) => {
        if (err) return res.status(400).json({ ok: false, message: 'Error occurred during fetching posts' });
        if (!post) return res.status(400).json({ ok: false, message: 'Cannot find the post. Maybe it is removed' });
        return res.json({ ok: true, post });
    });
}

const createPost = (req, res) => {
    const newPost = new Post(req.body);
    newPost.save((err, post) => {
        if (err) return res.status(400).json({ ok: false, message: 'Error occurred during saving post' });
        return res.json({ ok: true, post });
    });
};

const removePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id).exec((err) => {
        if (err) return res.status(400).json({ ok: false, message: 'Error occurred during removing post' }); 
        return res.json({ ok: true });
    });
}

const updatePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, req.body).exec((err, post) => {
        if (err) return res.status(400).json({ ok: false, message: 'Error occurred during updating post' }); 
        return res.json({ ok: true, post });
    });
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    removePost
}