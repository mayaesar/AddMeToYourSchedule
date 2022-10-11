import styled from "styled-components";
import { EventActionContext } from "../context/EventActionContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import Modal from "./Modal";




const DisplayEvent = ({schedule, friend, userId}) => {
    const { schedules, isLoading, sendPlanRequest } = useContext(EventActionContext);
    const [events, setEvents] = useState(null);
    const [display, setDisplay] = useState(null);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(null);
    const [userTags, setUserTags] = useState(null)


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
        background-color: var(--background-colour);
        padding: 1vw;
    }
`;

export default DisplayEvent;