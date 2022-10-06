// event{
//     _id: … ,
//     scheduleId: …,
//     title:...
//     start: yyyy/mm/dd MM:HH,
//     end: yyyy/mm/dd MM:HH,
//     tags: […],
//     joining:[userId],
//     }

const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");

const getEvent = async (req, res) => {
    // const {client, db} = createClient();
    // const schedule = db.collection('schedule');
    // const {eventId} = req.params;
    // console.log("===  event ID ===")
    // console.log(eventId)
    // try {
    //     await client.connect();
    //     const result = await schedule.findOne({_id:eventId});
    //     result 
    //     // event found
    //     ? res.status(200).json({ status: 200, data: result})
    //     // event not found
    //     : res.status(404).json({ status: 404, data: "event not found." });
    // } catch (err) {
    //     res.status(500).json({ status: 500, message: err.message });
    // }
    // client.close();
    // console.log("disconnected");
}
const getEvents = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const addEvent = async (req, res) => {
    // const {client, db} = createClient();
    // const schedules = db.collection('schedules');
    // const eventId = uuidv4();
    // const newEvent = {
    //     _id: eventId,
    //     ...req.body,
    //     tags: [],
    //     joining: [],
    // }
    // console.log("=== new Event ===");
    // console.log(newEvent);
    // try {
    //     await client.connect();
    //     const schedule = await schedules.findOne({_id:newEvent.scheduleId})
    //     if(!schedule){
    //         res.status(404).json({ status: 404, data: "Schedule not found." });
    //         client.close();
    //         return;
    //     }
    //     const scheduleId = schedule._id;
    //     const results = await events.insertOne(newEvent); 
    //     if (!results){
    //         res.status(404).json({ status: 404, data: "event not created." });
    //         client.close();
    //         return;
    //     }
    //     const updateEvents = {events: [...schedule.events, eventId]}
    //     await db.collection('schedules').updateOne({_id: scheduleId}, {$set: updateEvents})

    //     res.status(200).json({status:200, message:"Test", data:newEvent});
    // } catch (err) {
    //     res.status(500).json({ status: 500, message: err.message });
    // }
    // client.close();
    // console.log("disconnected");
}
const updateEvent = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}
const deleteEvent = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

module.exports={getEvent, getEvents, addEvent, updateEvent, deleteEvent};