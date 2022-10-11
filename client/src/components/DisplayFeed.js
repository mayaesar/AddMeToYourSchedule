import { useEffect, useState } from "react";
import styled from "styled-components";
import DisplayEvent from "./DisplayEvent";

const DisplayFeed = ({friends, userId}) => {
    const [display, setDisplay] = useState();

    const setupDisplay = () => {
        const arr = [];
        friends.map(friend => {
            const element = (
                <div className="event">
                    <p>{friend.name}</p>
                    <DisplayEvent schedule={friend.scheduleId} friend={friend} userId={userId}/>
                </div>
            )
            arr.push(element)
        })
        setDisplay(arr);
    }
    useEffect(() => {
        if (friends){
            setupDisplay();
        }
    }, [friends])
    
    return display?(
        <Wrapper>
            {display.map(element => {
                return element;
            })}
        </Wrapper>
    ):(
        <Wrapper>

        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    .event{
        margin-bottom: 1vw;
        padding: 1vw;
        border: var(--border);
        border-radius: var(--border-radius);
        height: 14vw;
    }
`;

export default DisplayFeed;