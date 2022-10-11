import styled from "styled-components";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { FriendActionContext } from "../context/FriendActionContext";
import {RotatingLines} from "react-loader-spinner"


const FriendsList = () => {
    const {currentUser, users} = useContext(UserContext);
    const {removeFriend} =useContext(FriendActionContext)
    return currentUser !== null && users !== null?(
        <Wrapper>
            <h2>Friends</h2>
            <DisplayFriends friends={currentUser.friends} users={users} removeFriend={removeFriend} />
            <h2>Pending friend requests</h2>
            <DisplayRequests friendRequests={currentUser.friendRequests} users={users}/>
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
export default FriendsList;