// user{
//     _id: … ,
//     name: …,
//     email: …,
//     profileImg: ...,
//     friends: […friend, {userId, tags[…]}],
//     tags: [],
//     friendRequests: [from userId],
//     planRequests: [{from userId, eventId}],
//     scheduleId: …,
//     }

const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");


const getUserId = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const {user} = req.params;
    try {
        await client.connect();
        const result = await users.findOne({email:user});
        result
        //the user found
        ? res.status(200).json({ status: 200, data: result })
        // user not found
        : res.status(404).json({ status: 404, data: "User not found." });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
}

const addUser = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const userId = uuidv4();
    const scheduleId = uuidv4();
    const newUser = {
        ...req.body,
        friends: [],
        requests: [],
        friendRequests: [],
        planRequests: [],
        scheduleId: scheduleId,
    };
    try {
        await client.connect();
        await users.insertOne(newUser);
        await db.collection('schedules').insertOne({_id:scheduleId});
        res.status(200).json({status:200, message:"User is created", data:userId});
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
}
const getUser = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const getUsers = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

const updateUser = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

module.exports={getUserId, getUser, getUsers, addUser, updateUser};