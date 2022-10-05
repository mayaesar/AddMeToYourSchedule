
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
    const [schedulerData, setSchedulerData] = useState([]);

    const scheduleId = user.scheduleId;

    useEffect(() => {
        if(userId !== null){
            updateEventList();
        }
    }, [userId]);

    console.log(schedulerData);
    // add all fetches here-------------------------------------------------->
        const updateEventList = () => {
            console.log("=== updating list ===")
            fetch(`/api/get-schedule/${scheduleId}`)
            .then(res => res.json())
            .then(json => {
                setSchedulerData(json.data.events);
            })
            .catch(() => {
                setIsError(true);
            })
            setIsUpdated(true);
        }
        const addEvent = (title, startDate, endDate, description) => {
            console.log("=== adding event ===")
            fetch(`/api/add-event/${scheduleId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, startDate, endDate, description})
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

    // <-------------------------------------------------- add all fetches here
    return(
        <EventActionContext.Provider 
        value={{
            addEvent,
            schedulerData,
        }}
        >
            {children}
        </EventActionContext.Provider>
    );
};