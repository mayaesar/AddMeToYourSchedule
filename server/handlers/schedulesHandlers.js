// schedule{
//     _id: …,
//     userId: …,
//     events: [{
//       _id: … ,
//      title:...,
//      start: yyyy/mm/dd MM:HH,
//      end: yyyy/mm/dd MM:HH,
//      description:...,
//      tags: ...,
//      joining:[userId],
//     }],
//  }


const { createClient } = require("./createClient");
const { v4: uuidv4 } = require("uuid");
const e = require("express");

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
        id: eventId,
        ...req.body,
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
        ? res.status(200).json({ status: 200, data: updateEvents})
        // Events not updated
        : res.status(404).json({ status: 404, data: "Events not updated." });
    } catch (error) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected");
    
}
const getSchedules = async (req, res) => {
    const {client, db} = createClient();
    const schedules = db.collection('schedules');
    try {
        await client.connect();
        const result = await schedules.find().toArray();
        result.length > 0 
        ? res.status(200).json({status: 200, data: result}) 
        : res.status(404).json({status: 404, message: "Data not found."});

    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
    client.close();
    console.log('disconnected');
}

const deleteEvent = async (req, res) => {
    const {client, db} = createClient();
    const schedules = db.collection('schedules');
    const scheduleId = req.params.scheduleId;
    const event = req.body.event;
    console.log(event)
    console.log(scheduleId);
    try {
        await client.connect();
        const schedule = await schedules.findOne({_id:scheduleId});
        if(!schedule){
            res.status(404).json({ status: 404, data: "Schedule not found." });
            client.close();
            return;
        }
        const newEventList = [];
        schedule.events.map(element => {
            console.log(element._id)
            if(!(element._id === event)){
                newEventList.push(element)
            }
        })
        console.log(newEventList)
        // res.status(200).json({status: 200, message: "so far so good "})
        const results = await schedules.updateOne({_id:scheduleId}, {$set: {events: newEventList}})
        results 
        // Event deleted
        ? res.status(200).json({ status: 200, data: newEventList})
        // Event not deleted
        : res.status(404).json({ status: 404, data: "Events not updated." });
        
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
    client.close();
    console.log('disconnected');
}

const updateEvent = async (req, res) => {
    const {client, db} = createClient();
    const schedules = db.collection('schedules');
    const scheduleId = req.params.scheduleId;
    const {
        eventId, 
        title,
        startDate,
        endDate,
        description,
        tags
    } = req.body;

    try {
        await client.connect();
        const schedule = await schedules.findOne({_id:scheduleId})
        if(!schedule){
            res.status(404).json({ status: 404, data: "Schedule not found." });
            client.close();
            return;
        }
        console.log("=== schedule ===")
        console.log(schedule)

        if(title){
            console.log("=== changing title ===")
            const event = await schedules.updateOne({_id:scheduleId, events:{$elemMatch:{_id: eventId}}}, {$set:{"events.$.title": title}})
        }

        if(startDate){
            console.log("=== changing start date ===")
            const event = await schedules.updateOne({_id:scheduleId, events:{$elemMatch:{_id: eventId}}}, {$set:{"events.$.startDate": startDate}})
        }

        if(endDate){
            console.log("=== changing end date ===")
            const event = await schedules.updateOne({_id:scheduleId, events:{$elemMatch:{_id: eventId}}}, {$set:{"events.$.endDate": endDate}})
        }

        if(description){
            console.log("=== changing description ===")
            const event = await schedules.updateOne({_id:scheduleId, events:{$elemMatch:{_id: eventId}}}, {$set:{"events.$.description": description}})
        }

        if(tags){
            console.log("=== changing tags ===")
            const event = await schedules.updateOne({_id:scheduleId, events:{$elemMatch:{_id: eventId}}}, {$set:{"events.$.tags": tags}})
        }
        res.status(200).json({ status: 200, message: "done"})
        
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
    client.close();
    console.log('disconnected');
}

const handlePlanRequest = async (req, res) => {
    const {client, db} = createClient();
    const schedules = db.collection('schedules');
    const users = db.collection('users');
    const {
        _id,
        event,
        userId,
        reply,
    } = req.body;
    try {
        await client.connect();
        const user = await users.findOne({_id});
        if(!user){
            res.status(404).json({ status: 404, data: "user not found." });
            client.close();
            return;
        }
        const newPlanRequests = [];
        const newEvent = [];
        user.planRequests.map(plan => {
            if(plan.event._id !== event._id){
                newPlanRequests.push(plan)
            }
        })
        const updatePlanRequest = await users.updateOne({_id}, {$set:{planRequests:newPlanRequests}})
        console.log(updatePlanRequest)
        if(reply === "accepted"){
            console.log("=== accepted ===")
            const friend = await users.findOne({_id:userId})
            if(!friend){
                res.status(404).json({ status: 404, data: "other user not found." });
                client.close();
                return;
            }
            // change joining list on both 
            // add event to schedule
            const schedule = await schedules.findOne({_id:user.scheduleId})
            if(!schedule){
                res.status(404).json({ status: 404, data: "schedule not found." });
                client.close();
                return;
            }
            // change joining
            const friendsSchedule = await schedules.findOne({_id:friend.scheduleId})
            if(!friendsSchedule){
                res.status(404).json({ status: 404, data: "schedule not found." });
                client.close();
                return;
            }
            // update friends schedule
            const newFriendsSchedule = friendsSchedule.events
            const newEvent = event;
            newFriendsSchedule.push(newEvent)
            console.log("=== new friend events ===")
            console.log(newFriendsSchedule)
            const friendResults = await schedules.updateOne({_id:friend.scheduleId},{$set:{events:newFriendsSchedule}})
            // update users event for joining 
            const newSchedule = [];
            const updateEvent = event;
            console.log(event.joining)
            updateEvent.joining.push(userId)
            schedule.events.map(userEvent => {
                if(userEvent._id === event._id){
                    newSchedule.push(updateEvent)
                }
                else{
                    newSchedule.push(userEvent)
                }
            })
            console.log("=== new events ===")
            console.log(newSchedule)
            const userResults = await schedules.updateOne({_id:user.scheduleId},{$set:{events:newSchedule}})
            if(!friendResults || !userResults){
                res.status(404).json({ status: 404, data: "schedules not updated" });
                client.close();
                return;
            }
            const notificationArr = friend.notifications;
            notificationArr.push(`${user.name} has accepted your plan request, you can now view this event in your schedule!`); 
            const newNotification = await users.updateOne({_id:userId},  {$set: {notifications: notificationArr}});
            if (!newNotification){
                res.status(404).json({status: 404, message: "notification did not send."});
                client.close();
                return;
            }
        }
        res.status(200).json({status: 200, message: "done"})

    }  catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
    client.close();
    console.log('disconnected');
}
module.exports={getSchedule, addEvent, getSchedules, deleteEvent, updateEvent, handlePlanRequest};
