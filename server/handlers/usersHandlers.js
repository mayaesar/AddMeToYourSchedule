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
    const {email} = req.params;
    console.log("=== email ===")
    console.log(email)
    try {
        await client.connect();
        const result = await users.findOne({email:email});
        result 
        //the user found
        ? res.status(200).json({ status: 200, data: result._id })
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
        _id: userId,
        ...req.body,
        friends: [],
        tags: [],
        friendRequests: [],
        planRequests: [],
        scheduleId: scheduleId,
    };
    console.log("=== new user ===");
    console.log(newUser);
    try {
        await client.connect();
        await users.insertOne(newUser);
        const newSchedule = {
            _id: scheduleId,
            userId : userId,
            events : [],
        }
        await db.collection('schedules').insertOne(newSchedule);
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