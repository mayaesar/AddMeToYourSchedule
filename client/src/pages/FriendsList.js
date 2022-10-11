import styled from "styled-components";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { FriendActionContext } from "../context/FriendActionContext";
import {RotatingLines} from "react-loader-spinner"

//where user can view and manage friends and friend requests
const FriendsList = () => {
    const {currentUser, users} = useContext(UserContext);
    const {removeFriend} =useContext(FriendActionContext)
    return currentUser !== null && users !== null?(
        <Wrapper>
            <p className="subheader">Friends</p>
            <DisplayFriends friends={currentUser.friends} users={users} removeFriend={removeFriend} />
            <p className="subheader">Pending friend requests</p>
            <DisplayRequests friendRequests={currentUser.friendRequests} users={users}/>
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
    .subheader{
        margin-top: 1vw;
        font-size: var(--subheader-font-size);
        border-bottom: var(--border) ;
    }
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