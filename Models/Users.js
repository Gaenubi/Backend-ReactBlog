import { MongoClient } from 'mongodb';
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db('React-blog');
const Users = database.collection('Users');

const query = {};
const options = { sort: {id: 1}};

const readItems = async (req, res) => {
    try{
        const allUsers = await Users.find(query, options).toArray();
        res.status(200).json(allUsers);
        }catch(err){
            console.log(err);
        }finally{
            await client.close();
        }
}

const createItem = async (name, password) => {
    try{
        const allUsers = await Users.find(query, options).toArray();
        const UserLength = await Users.countDocuments();
        const newItem = {
          "id": UserLength ? allUsers[UserLength].id + 1 : 1,
          "name": name,
          "password":  password
        }
        const insertedUser = await Users.insertOne(newItem);
        console.log(insertedUser.insertedId)   
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

const updateItem = async(item) => {
    try{
        const result = await Users.updateOne({"id": item.id}, {
          "checked": item.checked,
          "item":  item.item
        })
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

const deleteItem = async () => {
    try{
        const result = await Users.deleteOne({"id": 1})
        }catch(err){
            console.log(err);
        }finally{
            await client.close();
        }
}

module.exports = { readItems, createItem, updateItem, deleteItem }