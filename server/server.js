"use strict";

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {getUserId, getUser, getUsers, addUser, updateUser, friendRequests} = require("./handlers/usersHandlers");
const {getSchedule, addEvent, getSchedules} = require("./handlers/schedulesHandlers");
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
    

    //manages all schedule information
    .get("/api/get-schedule/:scheduleId", getSchedule)
    .get('/api/get-schedules', getSchedules)
    .patch("/api/add-event/:scheduleId", jsonParser, addEvent)


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