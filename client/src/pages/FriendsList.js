import styled from "styled-components";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
const FriendsList = () => {
    // fetch the user's friends and user Pendings
    const friends = [];
    const pendings = [];
    return(
        <Wrapper>
            <h2>Friends</h2>
            <DisplayFriends array={friends}/>
            <h2>Pending friend requests</h2>
            <DisplayRequests array={pendings}/>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
`;
export default FriendsList;