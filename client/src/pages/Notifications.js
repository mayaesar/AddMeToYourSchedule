import styled from "styled-components";
import DisplayNotifications from "../components/DisplayNotifications";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import DisplayRequests from "../components/DisplayRequests";

const Notifications = () => {
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const result = window.localStorage.getItem("userId");
            if (result === "null"){
                navigate("/sign-in")
            }
        } catch (error) {
            navigate("/sign-in")
        }
    }, [])
    // fetch users notifications
    return currentUser !== null?(
        <Wrapper>
            <h2>Notifications</h2>
            <DisplayNotifications notifications={currentUser.notifications}/>
            <DisplayRequests friendRequests={currentUser.friendRequests} planRequests={currentUser.planRequests}/>
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

export default Notifications;