// schedule{
//     _id: …,
//     userId: …,
//     events: [eventId…],
//     }

const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");

const getSchedule = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const updateSchedule = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

module.exports={getSchedule, updateSchedule};
