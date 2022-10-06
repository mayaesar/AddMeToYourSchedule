// user{
//     _id: … ,
//     name: …,
//     email: …,
//     profileImg: ...,
//     friends: […friend, {userId, tags[…]}],
//     tags: [],
//     friendRequests: [from userId],
//     planRequests: [{from userId, eventId}],
//     notifications; [],
//     scheduleId: …,
//     }

const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid"); 

// finds if user exists with email
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

// adds a user to users db and also creates a new schedule in schedules db
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
        // will hold all friend requests that user has received
        friendRequests: [],
        // holds all requests that user has sent
        requested: [],
        // hold all requests from other users for plans
        planRequests: [],
        Notifications: [],
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

// gets user information
const getUser = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const {userId} = req.params;
    console.log("=== ID ===")
    console.log(userId)
    try {
        await client.connect();
        const result = await users.findOne({_id:userId});
        result 
        // user found
        ? res.status(200).json({ status: 200, data: result})
        // user not found
        : res.status(404).json({ status: 404, data: "User not found." });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
}
const getUsers = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    try {
        await client.connect();
        const result = await users.find().toArray();
        result.length > 0 
        ? res.status(200).json({status: 200, data: result}) 
        : res.status(404).json({status: 404, data: "Data not found."});

    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
    client.close();
    console.log('disconnected');
}

const updateUser = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const {
        _id,
        name,
        email,
        profileImg,
        friends,
        tags,
        friendRequests,
        requested,
        planRequests,
        notifications,
        scheduleId,
    } = req.body;

    try {
        await client.connect();
        const user = await users.findOne({_id});
        if (!user){
            res.status(404).json({status: 404, data: "User not found."});
            client.close();
            return;
        }
        if(name || email || profileImg || scheduleId){
            res.status(404).json({status: 404, data: "Cannot change this information."});
            client.close();
            return;
        }
        if(friends){
            const updateFriends = await users.updateOne({_id}, {friends: {$set: friends}})
            res.status(200).json({status: 200, data: updateFriends, message:"friends list is updated!"})
        }
        if(tags){
            const updateTags = await users.updateOne({_id}, {tags: {$set: tags}})
            res.status(200).json({status: 200, data: updateTags, message:"Tags list is updated!"})
        }
        if(friendRequests){
            //const updateTags = await users.updateOne({_id}, {friendRequests: {$set: friendRequests}})
            res.status(200).json({status: 200, message:"not coded yet"})
        }
        if(requested){
            //const sentTo = await users.updateOne({_id: requested}, {tags: {$set: tags}})
            //const updateTags = await users.updateOne({_id}, {tags: {$set: tags}})
            res.status(200).json({status: 200, message:"Not coded yet"})
        }
        if(planRequests){
            res.status(200).json({status: 200, message:"Not coded yet"})
        }
        if(notifications){
            const updateNotifications = await users.updateOne({_id}, {notifications: {$set: notifications}})
            res.status(200).json({status: 200, data: updateNotifications, message:"Notifications are updated!"})
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
}

module.exports={getUserId, getUser, getUsers, addUser, updateUser};