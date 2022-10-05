import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const EventActionContext = createContext(null);

export const EventActionProvider = ({children}) => {
    const {
        tags,
        setIsError, 
        user, 
        userId,
        isUpdated,
        setIsUpdated,
    } = useContext(UserContext);
    const [eventList, setEventList] = useState(null);
    const [schedulerData, setSchedulerData] = useState([]);

    const scheduleId = user.scheduleId;

    useEffect(() => {
        if(userId !== null){
            updateEventList();
        }
    }, [userId]);

    useEffect(() => {
        if(eventList){
            eventList.map(eventId => {
                getEvent(eventId);
            })
        }
    }, [eventList])

    console.log(schedulerData);
    // add all fetches here-------------------------------------------------->
        const updateEventList = () => {
            console.log("=== updating list ===")
            fetch(`/api/get-schedule/${scheduleId}`)
            .then(res => res.json())
            .then(json => {
                setEventList(json.data.events);
            })
            .catch(() => {
                setIsError(true);
            })
            setIsUpdated(true);
        }
        const addEvent = (title, startDate, endDate) => {
            console.log("=== adding event ===")
            fetch('/api/add-event', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ scheduleId, title, startDate, endDate})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                updateEventList();
            })
            .catch((err) => {
                console.log(err.message);
                setIsError(true);
            })
        }
        const getEvent = async(eventId) => {
            fetch(`/api/get-event/${eventId}`)
            .then(res => res.json())
            .then(data => {
                setSchedulerData(arr => [...arr, data.data]);
            })
            .catch((err) => {
                console.log(err.message);
                setIsError(true);
            })
        }

    // <-------------------------------------------------- add all fetches here
    return(
        <EventActionContext.Provider 
        value={{
            addEvent,
            eventList,
        }}
        >
            ({children})
        </EventActionContext.Provider>
    );
};