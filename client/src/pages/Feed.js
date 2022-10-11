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
    padding-top: 1vw;
    width: 90%;
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
