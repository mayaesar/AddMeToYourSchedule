import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { EventActionContext } from "../context/EventActionContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";



const DisplayEvent = ({schedule}) => {
    const { schedules, isLoading } = useContext(EventActionContext);
    const [events, setEvents] = useState(null);
    const [display, setDisplay] = useState(null)

    const handleClick = (event) => {
        const scheduleId = schedule;
        console.log (event);
    }
    useEffect(() => {
        if(schedules !== null){
            const arr = []
            schedules.map(info => {
                if (info._id === schedule){
                    arr.push(info.events)
                }
            })
            setEvents(arr)
        }
    }, [schedules])

    useEffect(() => {
        if(events !== null){
            try {
                const arr = [];
                let isEvent = false;
                events[0].map(event => {
                    const start = moment(event.startDate).format('MMMM Do, h:mma');
                    const end = moment(event.endDate).format('h:mma')
                    const element = <div className="eventContainer" key={event.id} onClick={() => handleClick(event)}>
                        <h2>{event.title}</h2>
                        <p>{start} - {end}</p>
                    </div>
                    arr.push(element)
                    isEvent = true
                })
                if (isEvent){
                    setDisplay(arr);
                }
                else{
                    setDisplay([<h2 key={schedule}>User has no events coming up.</h2>])
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    }, [events])
    return (!isLoading) && (display !== null)?(
        <Wrapper>
            <Container> 
                {display.map(event => {
                    return event
                })}
            </Container>
        </Wrapper>
    ):(
        <>
        </>
    )
};

const Wrapper = styled.div`
        width: 90%;
        padding-top: 1vw;
        margin: auto;
`;
const Container = styled.div`
    display: flex;
    gap: .5vw;
    overflow-x: scroll;
    .eventContainer {
        min-width: 16vw;
        max-width: 16vw;
        border: var(--border);
        border-radius: var(--border-radius);
        height: 7vw;
        background-color: var(--secondary-colour);
        padding: 1vw;
    }
`;

export default DisplayEvent;