import styled from "styled-components";
import DisplayFeed from "../components/DisplayFeed";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Feed = () => {
    const { currentUser, users } = useContext(UserContext);
    const [friendInfo, setFriendInfo] = useState();
    const navigate = useNavigate();

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

    return friendInfo ?(
        <Wrapper>
            <DisplayFeed friends={friendInfo}/>
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

export default Feed;
