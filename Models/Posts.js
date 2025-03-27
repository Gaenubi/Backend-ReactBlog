const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db('reactblog');

const query = {};
const options = { sort: {id: 1}};

const readItems = async () => {
    client.connect()
    console.log('reading items');
    try{
        const Posts = await database.collection('posts');
        if(!Posts) throw new Error("Could not retrieve posts")
        const allPosts = await Posts.find(query, options).toArray();
        return allPosts;
    }catch(err){
        console.log(err);
    }finally{
        console.log("closing")
        await client.close();
    }
}

const viewItem = async (id) => {
    client.connect()
    try{
        const Posts = await database.collection('posts');
        if(!Posts) throw new Error("Could not retrieve posts")
        const Post = await Posts.findOne({id: id}, options);
        return Post;
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

const createItem = async (Title, Body) => {
    client.connect()
    try{
        const Posts = await database.collection('posts');
        if(!Posts) throw new Error("Could not retrieve posts")
        const allPosts = await Posts.find(query, options).toArray();
        const PostLength = await Posts.countDocuments();
        const newItem = {
          "_id": PostLength ? allPosts[PostLength - 1]._id + 1 : 1,
          "Title": Title,
          "Body":  Body
        }
        const insertedPost = await Posts.insertOne(newItem);
        console.log(insertedPost.insertedId)   
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

const updateItem = async(id, Title, Body) => {
    client.connect()
    try{
        const Posts = await database.collection('posts');
        if(!Posts) throw new Error("Could not retrieve posts")
        const result = await Posts.updateOne({_id: +id}, { $set: {
          "Title": Title,
          "Body":  Body
        }
        })
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

const deleteItem = async (id) => {
    client.connect()
    console.log("deleting")
    console.log(typeof id)
    try{
        const Posts = await database.collection('posts');
        if(!Posts) throw new Error("Could not retrieve posts")
        const result = await Posts.deleteOne({_id: +id})
        console.log(result)
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

module.exports = { readItems, viewItem, createItem, updateItem, deleteItem };