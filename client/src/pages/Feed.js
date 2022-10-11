import styled from "styled-components";
import DisplayFeed from "../components/DisplayFeed";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {RotatingLines} from "react-loader-spinner"

const Feed = () => {
    const { currentUser, users } = useContext(UserContext);
    const [friendInfo, setFriendInfo] = useState();

    const getFriends = () => {
        console.log("=== getFriends ===")
        try {
            const arr = [];
            let hasFriends = false;
            currentUser.friends.map(friend => {
                users.map(user => {
                    if (friend === user._id){
                        arr.push(user);
                        hasFriends = true;
                    }
                })
            })
            if(hasFriends){
                setFriendInfo(arr);
            }
            else{
                setFriendInfo("no friends")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(currentUser && users){
            getFriends();
        }
    },[currentUser, users])

    if(friendInfo === "no friends"){
        return <Wrapper>
            Must accept or send friend requests before viewing your feed.
        </Wrapper>
    }

    return friendInfo?(
        <Wrapper>
            <DisplayFeed friends={friendInfo} userId={currentUser._id}/>
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

export default Feed;
