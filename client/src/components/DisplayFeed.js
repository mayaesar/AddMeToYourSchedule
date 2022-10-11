import { useEffect, useState } from "react";
import styled from "styled-components";
import DisplayEvent from "./DisplayEvent";

// gets each friend and creates the container to place all events
const DisplayFeed = ({friends, userId}) => {
    const [display, setDisplay] = useState();
    // once friends has data this function  will create the element that holds all of the events from that user 
    const setupDisplay = () => {
        const arr = [];
        friends.map(friend => {
            const element = (
                <div className="event">
                    <p className="top">{friend.name}</p>
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
    .top{
        width: 90%;
        margin: auto;
        border-bottom: var(--border) ;
    }
    .event{
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        margin-bottom: 1vw;
        padding: 1vw;
        border: 1px solid rgba(255, 255, 255, 0.31);
        border-radius: var(--border-radius);
        height: 14vw;
    }
`;

export default DisplayFeed;