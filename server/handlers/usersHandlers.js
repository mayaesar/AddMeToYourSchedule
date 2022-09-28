// user{
//     _id: … ,
//     handle: …,
//     name: …,
//     email: …,
//     friends: […friend, {userId, tags[…]}],
//     notifications: […notification, {requestType, status, from(userId)}],
//     scheduleId: …,
//     }

const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");

const getUser = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const getUsers = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const addUser = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const updateUser = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

module.exports={getUser, getUsers, addUser, updateUser};