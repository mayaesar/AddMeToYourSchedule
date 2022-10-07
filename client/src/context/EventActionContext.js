
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
    
    useEffect(() => {
        if (currentUser !== null){
            setIsLoading(true)
            setScheduleId(currentUser.scheduleId);
            
        }
    }, [currentUser]);

    useEffect(() => {
        if(scheduleId !== null){
            updateEventList();
        }
    },[scheduleId])

    // add all fetches here-------------------------------------------------->
        const updateEventList = async() => {
            console.log("=== updating list ===")
            console.log(scheduleId)
            try {
                const res = await fetch(`/api/get-schedule/${scheduleId}`);
                const data = await res.json();
                if (data.status !== 200) return setIsError(true);
                setSchedulerData(data.data.events);
                setIsLoading(false)
            } catch (error) {
                setIsError(true);
            }
        }
        
        const addEvent = async (title, startDate, endDate, description) => {
            console.log("=== adding event ===")
            setIsLoading(true)
            try {
                const res = await fetch(`/api/add-event/${scheduleId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title, startDate, endDate, description})
                });
                const data = res.json();
                if (data.status !== 200) return setIsError(true)
                console.log(data);
                updateEventList();
            } catch (error) {
                setIsError(true)
            }
        }
    // <-------------------------------------------------- add all fetches here
    
    return(
        <EventActionContext.Provider 
        value={{
            addEvent,
            schedulerData,
            isLoading,
        }}
        >
            {children}
        </EventActionContext.Provider>
    );
};