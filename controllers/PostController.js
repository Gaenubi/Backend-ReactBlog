const { readItems, viewItem, createItem, updateItem, deleteItem  } = require('../Models/Posts');

const getAllPosts = async ( req , res) => {
    const Posts = await readItems();
    console.log(Posts);
    res.send(Posts);
}

const viewPost = async ( req, res) => {
    const Post = viewItem(req.params.id)
    if (!Post){
        res.status(404).send(`Error: Post not found`);
    }
    res.json(Post);
}

const createPost = async ( req, res) => {
    console.log(req.body.Title, req.body.body)
    const Post = createItem(req.body.Title, req.body.body)
}

const editPost = async ( req, res) => {
    const Post = updateItem( req.params.id, req.body.Title, req.body.body)
}

const deletePost = async ( req, res) => {
    const Post = deleteItem( req.params.id)
}

module.exports = { getAllPosts, viewPost, createPost, editPost, deletePost}