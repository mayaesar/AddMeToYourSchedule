import styled from "styled-components";
import DisplayNotifications from "../components/DisplayNotifications";
const Notifications = () => {
    // fetch users notifications
    const notifications = [];
    return(
        <Wrapper>
            <h2>Notifications</h2>
            <Notifications array={notifications}/>
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