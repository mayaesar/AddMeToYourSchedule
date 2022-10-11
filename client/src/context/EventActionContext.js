
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import moment from "moment";

export const EventActionContext = createContext(null);

export const EventActionProvider = ({children}) => {
    const {
        currentUser, 
        userId,
        getUserInfo,
    } = useContext(UserContext);
    const [schedulerData, setSchedulerData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [scheduleId, setScheduleId] = useState(null);
    const [schedules, setSchedules] = useState(null);

    useEffect(() => {
        if (currentUser !== null){
            setIsLoading(true)
            setScheduleId(currentUser.scheduleId);
            getSchedules();
        }
    }, [currentUser]);

    useEffect(() => {
        if(scheduleId !== null){
            try {
                fetch(`/api/get-schedule/${scheduleId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.status !== 200) return setIsError(true);
                        setSchedulerData(data.data.events);
                        setIsLoading(false)
                    })
            } catch (error) {
                setIsError(true);
            }
        }
    },[scheduleId])

    // add all fetches here-------------------------------------------------->
        const getSchedules = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/get-schedules`);
                const data = await res.json();
                if (data.status !== 200) return setIsError(true)
                setSchedules(data.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsError(true)
            }
        }
        const updateEvents = async () => {
            try {
                fetch(`/api/get-schedule/${scheduleId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.status !== 200) return setIsError(true);
                        setSchedulerData(data.data.events);
                        setIsLoading(false)
                    })
            } catch (error) {
                setIsError(true);
            }
        }
        const addEvent = async (title, startDate, endDate, description, tags) => {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/add-event/${scheduleId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title, startDate, endDate, description, tags})
                });
                const data = await res.json();
                if (data.status !== 200) return setIsError(true)
                setSchedulerData(data.data.events);
                setIsLoading(false)
                //updateEventList();
            } catch (error) {
                console.log(error)
                setIsError(true)
            }
        }
        const deleteEvent = async(event) => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/delete-event/${scheduleId}`,{
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({event})
                })
                const data = await res.json();
                if (data.status !== 200) return setIsError(true)
                setSchedulerData(data.data)
            } catch (err) {
                console.log(err)
                setIsError(true)
            }
            setIsLoading(false);
        }
        const updateEvent = async(updates) => {
            const eventId = Object.getOwnPropertyNames(updates)[0];
            let title = null;
            if (updates[eventId].title){
                title = updates[eventId].title
            }
            let startDate = null;
            if (updates[eventId].startDate){
                startDate = updates[eventId].startDate
            }
            let endDate = null;
            if (updates[eventId].endDate){
                endDate = updates[eventId].endDate
            }
            let description = null;
            if (updates[eventId].notes){
                description = updates[eventId].notes
            }
            let tags = null;
            if(updates[eventId].tags){
                tags = updates[eventId].tags
            }
            setIsLoading(true);
            try {
                const res = await fetch(`/api/update-event/${scheduleId}`,{
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({eventId, title, startDate, endDate, description, tags})
                })
                const data = await res.json();
                if (data.status !== 200) return setIsError(true)
            } catch (err) {
                console.log(err)
                setIsError(true)
            }
            getUserInfo();
            updateEvents();
        }
        const sendPlanRequest = async (event, friend) => {
            const friendId = friend._id;
            const user = currentUser;
            const timestamp = moment().format();
            try {
                const res = await fetch('/api/send-plan-request', {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({event, friendId, user, timestamp})
                });
                const json = await res.json();
                if(json.status === 200){
                    console.log(json)
                }
                else{
                    setIsError(true);
                }
            } catch (err) {
                console.log(err.message);
                setIsError(true);
            }

        }

        const handlePlanRequest = async ({event, userId, reply}) => {
            const _id = currentUser._id;
            try {
                const res = await fetch('/api/plan-request', {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({_id, event, userId, reply})
                });
                const json = await res.json();
                if(json.status === 200){
                    getUserInfo();
                }
                else{
                    console.log(json);
                    setIsError(true);
                }
            } catch (err) {
                console.log(err.message);
                setIsError(true);
            }
        }
    // <-------------------------------------------------- add all fetches here
    
    return(
        <EventActionContext.Provider 
        value={{
            addEvent,
            schedulerData,
            isLoading,
            schedules,
            deleteEvent,
            updateEvent,
            sendPlanRequest,
            handlePlanRequest,
        }}
        >
            {children}
        </EventActionContext.Provider>
    );
};