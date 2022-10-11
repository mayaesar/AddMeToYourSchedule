import styled from "styled-components";
import DisplayNotifications from "../components/DisplayNotifications";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import DisplayRequests from "../components/DisplayRequests";
import {RotatingLines} from "react-loader-spinner"


const Notifications = () => {
    const {currentUser, users} = useContext(UserContext);

    // fetch users notifications
    return currentUser !== null && users !== null?(
        <Wrapper>
            <h2>Notifications</h2>
            <DisplayNotifications notifications={currentUser.notifications}/>
            <h2>Requests</h2>
            <DisplayRequests friendRequests={currentUser.friendRequests} planRequests={currentUser.planRequests} users={users}/>
        </Wrapper>
    ):(
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
};

const Wrapper = styled.div`
    min-height: 43vw;
    max-height: 43vw;
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

export default Notifications;