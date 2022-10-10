"use strict";

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {getUserId, getUser, getUsers, addUser, updateUser, friendRequests, sendPlanRequest} = require("./handlers/usersHandlers");
const {getSchedule, addEvent, getSchedules, deleteEvent, updateEvent, handlePlanRequest} = require("./handlers/schedulesHandlers");
const jsonParser = bodyParser.json();

express()

    .use(helmet())
    .use(morgan('tiny'))

    //ENDPOINTS -----------------------------------------------------------> 
    //manages all user information
    .get("/api/get-user-id/:email", getUserId)
    .get("/api/get-user/:userId", getUser)
    .get("/api/get-users", getUsers)
    .post("/api/create-user", jsonParser, addUser)
    .patch("/api/update-user", jsonParser, updateUser)
    .patch("/api/friend-request", jsonParser, friendRequests)
    .patch("/api/send-plan-request", jsonParser, sendPlanRequest)

    //manages all schedule information
    .get("/api/get-schedule/:scheduleId", getSchedule)
    .get('/api/get-schedules', getSchedules)
    .patch("/api/add-event/:scheduleId", jsonParser, addEvent)
    .delete("/api/delete-event/:scheduleId", jsonParser, deleteEvent)
    .patch('/api/update-event/:scheduleId', jsonParser, updateEvent)
    .patch("/api/plan-request", jsonParser, handlePlanRequest)


    //oops!
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })
//<------------------------------------------------ENDPOINTS


    .listen(8000, () => {
        console.log(`Server launched on port 8000`)
    });