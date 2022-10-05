import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { EventActionContext } from "../context/EventActionContext";
import DisplaySchedule from "../components/schedule/DisplaySchedule";

const MySchedule = () => {
    const {userId, isError, isUpdated} = useContext(UserContext);
    const {schedulerData} = useContext(EventActionContext);
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

    return (schedulerData || !schedulerData) &&isUpdated?(
        <Wrapper>
            <h1>
                My Schedule
            </h1>
            <DisplaySchedule />
        </Wrapper>
    ):(
        <Wrapper>
            <h1>Loading...</h1>
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