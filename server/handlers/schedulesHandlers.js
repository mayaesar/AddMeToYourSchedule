// schedule{
//     _id: …,
//     userId: …,
//     events: [{
//       _id: … ,
//      title:...,
//      start: yyyy/mm/dd MM:HH,
//      end: yyyy/mm/dd MM:HH,
//      description:...,
//      tags: […],
//      joining:[userId],
//     }],
//  }


const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");

const getSchedule = async (req, res) => {
    const {client, db} = createClient();
    const schedules = db.collection('schedules');
    const {scheduleId} = req.params;
    console.log("=== schedule id ===")
    console.log(scheduleId)
    try {
        await client.connect();
        const result = await schedules.findOne({_id:scheduleId});
        result 
        // schedule found
        ? res.status(200).json({ status: 200, data: result})
        // schedule not found
        : res.status(404).json({ status: 404, data: "Schedule not found." });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
}

const addEvent = async (req, res) => {
    const {client, db} = createClient();
    const schedules = db.collection('schedules');
    const eventId = uuidv4();
    const {scheduleId} = req.params;
    const newEvent = {
        _id: eventId,
        ...req.body,
        tags: [],
        joining: [],
    }

    console.log("=== new Event ===");
    console.log(newEvent);
    try {
        await client.connect();
        const schedule = await schedules.findOne({_id:scheduleId})
        if(!schedule){
            res.status(404).json({ status: 404, data: "Schedule not found." });
            client.close();
            return;
        }
        const updateEvents = {events: [...schedule.events, newEvent]}
        const updatedList = await schedules.updateOne({_id:scheduleId}, {$set:updateEvents});
        updatedList 
        // Events updated
        ? res.status(200).json({ status: 200, data: updatedList})
        // Events not updated
        : res.status(404).json({ status: 404, data: "Events not updated." });
    } catch (error) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
    
}

module.exports={getSchedule, addEvent};
