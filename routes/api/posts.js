const Posts = require('./../../Models/Posts');
const express = require('express');
const router = express.Router();
const path = require('path');
const postcontroller = require('../../controllers/PostController')


router.route('/')
    .get(postcontroller.getAllPosts)
    .post(postcontroller.createPost)
    .put((req, res) => {
        res
    })
    .delete((req, res) => {
        res
    })

    router.route('/:id')
        .get(postcontroller.viewPost)
        .post(postcontroller.editPost)
        .delete(postcontroller.deletePost)

module.exports = router;