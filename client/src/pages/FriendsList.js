import styled from "styled-components";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { FriendActionContext } from "../context/FriendActionContext";

const FriendsList = () => {
    const {currentUser, users} = useContext(UserContext);
    const {removeFriend} =useContext(FriendActionContext)
    const friends = [];
    const pendings = [];
    return currentUser !== null && users !== null?(
        <Wrapper>
            <h2>Friends</h2>
            <DisplayFriends friends={currentUser.friends} users={users} removeFriend={removeFriend} />
            <h2>Pending friend requests</h2>
            <DisplayRequests friendRequests={currentUser.friendRequests} users={users}/>
        </Wrapper>
    ):(
        <Wrapper>

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