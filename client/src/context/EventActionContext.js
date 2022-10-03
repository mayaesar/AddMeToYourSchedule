import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const EventActionContext = createContext(null);

export const EventActionProvider = ({children}) => {
    const {
        tags,
        isErr,
        setIsError, 
        user, 
        userId,
        isUpdated,
        setIsUpdated,
    } = useContext(UserContext);
    const [eventList, setEventList] = useState(null);
    // will hold _id, scheduleId, title
    const [event, setEvent] = useState(null);
    const [eventTags, setEventTags] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [joining, setJoining] = useState(null);

    const scheduleId = user.scheduleId;
    useEffect(() => {
        if(userId !== null){
            updateEventList();
        }
    }, [userId]);
    
    // add all fetches here-------------------------------------------------->
        const updateEventList = () => {
            fetch(`/api/get-schedule/${scheduleId}`)
            .then(res => res.json())
            .then(json => {
                setEventList(json.data.events);
            })
            .catch(() => {
                setIsError(true);
            })
        }

    // <-------------------------------------------------- add all fetches here
    return(
        <EventActionContext.Provider 
        value={{
            setEvent, 
            setEventTags,
            setDate,
            setTime,
            eventList,
        }}
        >
            ({children})
        </EventActionContext.Provider>
    );
};