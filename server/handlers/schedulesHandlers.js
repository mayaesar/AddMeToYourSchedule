// schedule{
//     _id: …,
//     userId: …,
//     events: [eventId…],
//     }

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
        console.log("=== result ===")
        console.log(result)
        result 
        // schedule found
        ? res.status(200).json({ status: 200, data: result})
        // schedule not found
        : res.status(404).json({ status: 404, data: "Schedule not found." });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
}
const updateSchedule = async (req, res) => {
    res.status(200).json({ status: 200, message: "hello"})
}

module.exports={getSchedule, updateSchedule};
