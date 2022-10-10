import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { EventActionContext } from "../context/EventActionContext";
import DisplaySchedule from "../components/schedule/DisplaySchedule";
import { Scheduler } from "@devexpress/dx-react-scheduler";

const MySchedule = () => {
    const {currentUser, isError} = useContext(UserContext);

    const navigate = useNavigate();


    if (isError){
        return(
            <Wrapper>
                <h1>Error</h1>
            </Wrapper>
        );
    }    

    return (currentUser !== null)?(
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