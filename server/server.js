"use strict";

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {getUserId, getUser, getUsers, addUser, updateUser} = require("./handlers/usersHandlers");
const {getSchedule, updateSchedule} = require("./handlers/schedulesHandlers");
const {getEvent, getEvents, addEvent, updateEvent, deleteEvent} = require("./handlers/eventsHandlers");
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
    .patch("/api/update-user/:userId", updateUser)

    //manages all schedule information
    .get("/api/get-schedule/:scheduleId", getSchedule)

    //manages all event information
    .get("/api/get-event/:eventId", getEvent)
    .patch("/api/update-schedule/:scheduleId", updateSchedule)
    .post("/api/add-event", addEvent)
    .patch("/api/update-event/:eventId", updateEvent)
    .delete("/api/delete-event/:eventId", deleteEvent)
                //dont do yet vvv
    .get("/api/get-events", getEvents)

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