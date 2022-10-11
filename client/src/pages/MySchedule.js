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
            <DisplaySchedule />
        </Wrapper>
    ):(
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
};
const Wrapper = styled.div`
    min-height: 88vh;
    overflow: scroll;
    padding: 2vw;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.31);
    backdrop-filter: blur(8.6px);
    border-top: none;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    padding-top: 1vw;
    max-width: var(--max-width);
    margin: auto;
    font-size: 1vw;
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