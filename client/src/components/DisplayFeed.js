import { useEffect, useState } from "react";
import styled from "styled-components";
import DisplayEvent from "./DisplayEvent";

const DisplayFeed = (friends) => {
    const [display, setDisplay] = useState();

    const setupDisplay = () => {
        const arr = [];
        friends.friends.map(friend => {
            const element = (
                <div className="event">
                    <p>{friend.name}</p>
                    <DisplayEvent schedule={friend.scheduleId}/>
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
    const event = null;
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
        height: 12vw;
    }
`;

export default DisplayFeed;