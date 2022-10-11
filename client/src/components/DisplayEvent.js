import styled from "styled-components";
import { EventActionContext } from "../context/EventActionContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import Modal from "./Modal";



// this manages all the events the the user sees in feed 
const DisplayEvent = ({schedule, friend, userId}) => {
    const { schedules, isLoading, sendPlanRequest } = useContext(EventActionContext);
    const [events, setEvents] = useState(null);
    const [display, setDisplay] = useState(null);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(null);
    const [userTags, setUserTags] = useState(null)

    // this function is executed when friend and schedules have data
    //will save all events of that users friend 
    // check what tags user has access to  
    useEffect(() => {
        if(schedules && friend){
            const arr = []
            const arrTags = [];
            try {
                let isTags = false
                friend.tags.map(item => {
                    item.friendId.map(id => {
                        if(id === userId){
                            isTags = true
                            arrTags.push(item.tag)
                        }
                    })
                })
                if(isTags){
                    setUserTags(arrTags)
                }
            } catch (error) {
                
            }
            schedules.map(info => {
                if (info._id === schedule){
                    arr.push(info.events)
                }
            })
            setEvents(arr)
        }
    }, [schedules || friend])

    //executes once events are loaded 
    // goes through each one and creates the element 
    // and makes sure that the user has permission to access this event 
    useEffect(() => {
        if(events !== null){
            try {
                const arr = [];
                let isEvent = false;
                events[0].map(event => {
                    const tag = event.tags
                    const until = moment(event.startDate).fromNow()
                    const start = moment(event.startDate).format('MMMM Do, h:mma');
                    const end = moment(event.endDate).format('h:mma')
                    const element = <div className="eventContainer" key={event.id} onClick={() => {
                        setShow(true) 
                        setModal(event)}}>
                        <h2>{event.title}</h2>
                        <p>{start} - {end}</p>
                        <p>{until}</p>
                    </div>
                    
                    if(tag){
                        if(userTags){
                            userTags.map(item => {
                                if(item === tag){
                                    arr.push(element)
                                    isEvent = true
                                }
                                
                            })
                        }
                    }
                    else{
                        arr.push(element)
                        isEvent = true
                    }
                    
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

    // if user clicks on send invite 
    const handleClick = (event) => {
        sendPlanRequest(event, friend);
        setShow(false);
    }
    return (!isLoading) && (display !== null)?(
        <Wrapper>
            <Modal show={show} modal={modal} handleClick={handleClick} onClose={() => setShow(false)}/>
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
        border-radius: var(--border-radius);
        height: 9vw;
        padding: 2vw;
        background: rgba(255, 255, 255, 0.1);
        border: var(--border);
        backdrop-filter: blur(8.6px);
        border-bottom-left-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
        padding-top: 1vw;
        font-size: 1vw;
    }
`;

export default DisplayEvent;