
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const EventActionContext = createContext(null);

export const EventActionProvider = ({children}) => {
    const {
        currentUser, 
        userId,
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
            console.log("=== getting schedules ===")
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
        const addEvent = async (title, startDate, endDate, description, tags) => {
            console.log("=== adding event ===")
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
            console.log("=== deleting event ===")
            console.log(event);
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
    // <-------------------------------------------------- add all fetches here
    
    return(
        <EventActionContext.Provider 
        value={{
            addEvent,
            schedulerData,
            isLoading,
            schedules,
            deleteEvent
        }}
        >
            {children}
        </EventActionContext.Provider>
    );
};