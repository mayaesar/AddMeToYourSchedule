import styled from "styled-components";
import DisplayNotifications from "../components/DisplayNotifications";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Notifications = () => {
    const { userId } = useContext(UserContext);
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

    if(!userId){
        navigate("/sign-in");
    }
    // fetch users notifications
    const notifications = [];
    return(
        <Wrapper>
            <h2>Notifications</h2>
            <DisplayNotifications array={notifications}/>
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