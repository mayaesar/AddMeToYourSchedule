import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { EventActionContext } from "../context/EventActionContext";
import DisplaySchedule from "../components/schedule/DisplaySchedule";

const MySchedule = () => {
    const [schedule, setSchedule] = useState(null);
    const {userId, user, isError, isUpdated} = useContext(UserContext);
    const {eventList} = useContext(EventActionContext);
    const navigate = useNavigate();

    if(!userId){
        navigate("/sign-out");
    }

    if (isError){
        return(
            <Wrapper>
                <h1>Error</h1>
            </Wrapper>
        );
    }
    if(schedule){
        console.log("=== schedule ===")
        console.log(schedule)
    }
    
// use the scheduler-react npm
//fetch user's schedule
    return(
        <Wrapper>
            <h1>
                My Schedule
            </h1>
            <DisplaySchedule eventList={eventList} />
        </Wrapper>
    )
};
const Wrapper = styled.div`
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
`;
export default MySchedule;