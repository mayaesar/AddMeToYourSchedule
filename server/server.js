"use strict";

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const {getUser, getUsers, addUser, updateUser} = require("./handlers/usersHandlers");
const {getSchedule, updateSchedule} = require("./handlers/schedulesHandlers");
const {getEvent, getEvents, addEvent, updateEvent, deleteEvent} = require("./handlers/eventsHandlers")

express()

    .use(helmet())
    .use(morgan('tiny'))

    //manages all user information
    .get("/api/get-user", getUser)
    .get("/api/get-users", getUsers)
    .post("/api/add-user", addUser)
    .patch("/api/update-user", updateUser)

    //manages all schedule information
    .get("/api/get-schedule", getSchedule)
    .patch("/api/update-schedule", updateSchedule)

    //manages all event information
    .get("/api/get-event", getEvent)
    .get("/api/get-events", getEvents)
    .post("/api/add-event", addEvent)
    .patch("/api/update-event", updateEvent)
    .delete("/api/delete-event", deleteEvent)

    //oops!
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    .listen(8000, () => {
        console.log(`Server launched on port 8000`)
    });