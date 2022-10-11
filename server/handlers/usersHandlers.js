// user{
//     _id: … ,
//     name: …,
//     email: …,
//     friends: [friendId],
//     tags: [{tag, [friendId]}],
//     friendRequests: [from userId],
//     requested: [to userId],
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
        notifications: [],
        scheduleId: scheduleId,
    };
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
    try {
        await client.connect();
        const result = await users.findOne({_id:userId});
        result 
        // user found
        ? res.status(200).json({ status: 200, data: result})
        // user not found
        : res.status(404).json({ status: 404, message: "User not found." });
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
        : res.status(404).json({status: 404, message: "Data not found."});

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
        friends,
        requested,
        notifications,
        scheduleId,
    } = req.body;

    try {
        await client.connect();
        const user = await users.findOne({_id});
        if (!user){
            res.status(404).json({status: 404, message: "User not found."});
            client.close();
            return;
        }
        if(name || email || scheduleId){
            res.status(404).json({status: 404, message: "Cannot change this information."});
            client.close();
            return;
        }
        if(friends){
            const updateFriends = await users.updateOne({_id}, {friends: {$set: friends}})
            res.status(200).json({status: 200, data: updateFriends, message:"friends list is updated!"})
        }
        if(requested){
            const userId = requested.addUserId;
            const friend = await users.findOne({_id:userId})
            if(!friend){
                res.status(404).json({status: 404, message: "Cannot find user request was sent to."});
                client.close();
                return;
            }
             // updates requested
            const newRequestedArr = user.requested;
            newRequestedArr.push(requested);
            const updateRequested = await users.updateOne({_id}, {$set: {requested: newRequestedArr}})
            // updates other users friend request
            const newFriendRequestArr = friend.friendRequests;
            const request = {userId:_id, timestamp:requested.timestamp};
            newFriendRequestArr.push(request);
            const updateFriendRequest = await users.updateOne({_id:userId}, {$set: {friendRequests: newFriendRequestArr}})

            if (!updateRequested || !updateFriendRequest){
                res.status(404).json({status: 404, message: "Friend request not complete"});
                client.close();
                return;
            }
            res.status(200).json({status: 200, message:"request sent"})
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

const friendRequests = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const {
        _id,
        userId,
        reply,
    } = req.body;
    try {
        await client.connect();
        const user = await users.findOne({_id});
        if (!user){
            res.status(404).json({status: 404, message: "User not found."});
            client.close();
            return;
        }
        const otherUser = await users.findOne({_id:userId});
        if (!otherUser){
            res.status(404).json({status: 404, message: "Other user not found."});
            client.close();
            return;
        }

        const updateFriendRequest = await users.updateOne({_id}, {$pull: {friendRequests: {userId:userId}}})
        const updateRequested = await users.updateOne({_id:userId}, {$pull: {requested: {addUserId:_id}}})
        if (!updateFriendRequest || !updateRequested){
            res.status(404).json({status: 404, message: "request not complete."});
            client.close();
            return;
        }
        if(reply === "accepted"){
            const userFriends = user.friends
            userFriends.push(userId);
            const addedOtherUser = await users.updateOne({_id}, {$set:{friends:userFriends}});
            if (!addedOtherUser){
                res.status(404).json({status: 404, message: "friend was not added properly."});
                client.close();
                return;
            }
            const otherUserFriends = otherUser.friends
            otherUserFriends.push(_id);
            const addedUser = await users.updateOne({_id:userId}, {$set:{friends:otherUserFriends}});
            if (!addedUser){
                res.status(404).json({status: 404, message: "Other friend's was not added properly."});
                client.close();
                return;
            }
            const notificationArr = otherUser.notifications;
            notificationArr.push(`${user.name} has accepted your friend request!`); 
            const newNotification = await users.updateOne({_id:userId},  {$set: {notifications: notificationArr}});
            if (!newNotification){
                res.status(404).json({status: 404, message: "notification did not send."});
                client.close();
                return;
            }
        }
        res.status(200).json({status: 200, message:"done"})

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
}
const sendPlanRequest = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const schedules = db.collection('schedules');
    const {
        user,
        friendId,
        event,
        timestamp,
    } = req.body;
    try {
        await client.connect();
        const check = await schedules.findOne({_id:user.scheduleId});
        if(!check){
            res.status(404).json({status: 404, message: "Cannot check schedule "});
            client.close();
            return;
        }
        let match = false;
        check.events.map(userEvent => {
            if(event._id === userEvent._id){
                match = true
            }
        })
        if(match){
            res.status(404).json({status: 404, message: "already participating in this event"});
            client.close();
            return;
        }
        const friend = await users.findOne({_id:friendId});
        if(!friend){
            res.status(404).json({status: 404, message: "Cannot find user "});
            client.close();
            return;
        }
        const planRequests = friend.planRequests;
        const request = {
            user: user._id,
            event: event,
            timestamp: timestamp,
        }
        planRequests.push(request);
        const results = await users.updateOne({_id:friendId}, {$set: {planRequests: planRequests}});
        results 
        // Event deleted
        ? res.status(200).json({ status: 200, message: "request sent" })
        // Event not deleted
        : res.status(404).json({ status: 404, message: "request not sent" });

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
}
const removeFriend = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const {_id, friend} = req.body;
    try {
        await client.connect();
        const user = await users.findOne({_id});
        if(!user){
            res.status(404).json({ status: 404, message: "User not found." });
            client.close();
            return;
        }
        const otherUser = await users.findOne({_id:friend});
        if(!otherUser){
            res.status(404).json({ status: 404, message: "Other user not found." });
            client.close();
            return;
        }
        const userFriends = []
        user.friends.map(userFriend => {
            if(!(userFriend === friend)){
                userFriends.push(userFriend)
            }
        })
        const userFriendsUpdate = await users.updateOne({_id}, {$set:{friends:userFriends}})
        const otherUserFriends = []
        user.friends.map(otherUserFriend => {
            if(!(otherUserFriend === _id)){
                otherUserFriends.push(otherUserFriend)
            }
        })
        const otherUserFriendsUpdate = await users.updateOne({_id:friend}, {$set:{friends:otherUserFriends}})
        if(!userFriendsUpdate || !otherUserFriendsUpdate){
            res.status(404).json({ status: 404, message: "friend was not removed" });
            client.close();
            return;
        }
        res.status(200).json({ status: 200, message:"done"})
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
    
}
const updateTags = async (req, res) => {
    const {client, db} = createClient();
    const users = db.collection('users');
    const {userId} = req.params;
    const {
        tag,
        friendId,
        change,
    } = req.body;
    try {
        await client.connect();
        const user = await users.findOne({_id:userId})
        if(!user){
            res.status(404).json({status: 404, message: "User not found."});
            client.close();
            return;
        }
        if(!tag){
            res.status(404).json({status: 404, message: "Need to send a tag first"});
            client.close();
            return;
        }
        const tags = user.tags;

        if(change === "add tag"){
            try {
                let match = false;
                tags.map(item => {
                    if(item.tag == tag){
                        match = true;
                    }
                })
                if(match){
                    res.status(404).json({status: 404, message: "Tag already created"});
                    client.close();
                    return;
                }
            } catch (err) {
                
            }
            if(friendId){
                const arr = [];
                arr.push(friendId);
                newTag = {tag:tag, friendId:arr}
                tags.push(newTag)
            }
            else{
                newTag = {tag:tag, friendId:[]}
                tags.push(newTag)
            }
            await users.updateOne({_id:userId},{$set:{tags:tags}})
            res.status(200).json({status: 200, message:"done"})
            client.close();
            return;
        }
        if(change === "remove friend of tag"){
            const newTagsArr = [];
            tags.map(item => {
                if(item.tag == tag){
                    const newFriendArr = [];
                    item.friendId.map(id => {
                        if(id !== friendId){
                            newFriendArr.push(id)
                        }
                    })
                    newTagsArr.push({tag:item.tag, friendId:newFriendArr});
                }
                else{
                    newTagsArr.push(item)
                }
            })
            await users.updateOne({_id:userId},{$set:{tags:newTagsArr}})
            res.status(200).json({status: 200, message:"done"})
            client.close();
            return;
        }
        if(change === "add friend to tag"){
            const newTagsArr = [];
            tags.map(item => {
                if(item.tag == tag){
                    const newFriendArr = item.friendId;
                    newFriendArr.push(friendId)
                    newTagsArr.push({tag:item.tag, friendId:newFriendArr});
                }
                else{
                    newTagsArr.push(item)
                }
            })
            await users.updateOne({_id:userId},{$set:{tags:newTagsArr}})
            res.status(200).json({status: 200, message:"done"})
            client.close();
            return;
        }
        
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
    client.close();
    console.log('disconnected');
}
module.exports={getUserId, getUser, getUsers, addUser, updateUser, friendRequests, sendPlanRequest, removeFriend, updateTags};