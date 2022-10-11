import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import DisplaySchedule from "../components/schedule/DisplaySchedule";
import {RotatingLines} from "react-loader-spinner"

const MySchedule = () => {
    const {currentUser, isError} = useContext(UserContext);



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
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
};
const Wrapper = styled.div`
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
`;
const Loader = styled.div`
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.3);
    display: flex;
`;
export default MySchedule;