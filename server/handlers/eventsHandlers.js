// event{
//     _id: … ,
//     scheduleId: …,
//     title:...,
//     date: DD/MM/YYYY,
//     startTime: MM:HH,
//     endTime: MM:HH,
//     tags: […],
//     joining:[userId],
//     }

const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");

const getEvent = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const getEvents = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const addEvent = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const updateEvent = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const deleteEvent = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

module.exports={getEvent, getEvents, addEvent, updateEvent, deleteEvent};