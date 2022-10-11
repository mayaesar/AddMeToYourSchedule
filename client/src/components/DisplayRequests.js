import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FriendActionContext } from "../context/FriendActionContext";
import moment from "moment";
import { EventActionContext } from "../context/EventActionContext";

// this will display all requests 
// allowing the user to respond to the requests 
const DisplayRequests = ({friendRequests, planRequests, users}) => {
    const {isError, friendRequestHandler} = useContext(FriendActionContext);
    const {handlePlanRequest} = useContext(EventActionContext);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState();

    //runs when both friendrequest and [lan requests are loaded 
    useEffect(() => {
        if(friendRequests !== undefined || planRequests !== undefined){
            setRequests([])
            setIsLoading(true)
            getRequests();
        }
    }, [friendRequests || planRequests])

    useEffect(() => {
        try {
            if(requests.length >= 1){
                setIsLoading(false)
            }
        } catch (error) {
            
        }
    }, [requests])

// creates the friend and plan request elements
// and allowing user to reply to each one with accept or decline
    const getRequests = () => {
        try {
            const arr = []
            friendRequests.map(request => {
                users.map(user => {
                    if (request.userId === user._id){
                        const element = <div className="requests">
                        <span>
                            <h2>{user.name}</h2>
                            <p>has sent you a friend request</p>
                        </span>
                        <span>
                            <button onClick={() => friendRequestHandler({userId:request.userId, reply:"accepted"})}>Accept</button>
                            <button onClick={() => friendRequestHandler({userId:request.userId, reply:"declined"})}>Decline</button>
                        </span>
                    </div>;
                    setRequests((arr) => [...arr, element])
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
        try {
            planRequests.map(request => {
                users.map(user => {
                    if (request.user === user._id){
                        const startDate = moment(request.event.startDate).format('MMMM Do');
                        const element = <div className="requests">
                        <span>
                            <h2>{user.name}</h2>
                            <p>has sent you a request on your event called {request.event.title} on {startDate}</p>
                        </span>
                        <div className="buttons">
                            <button onClick={() => handlePlanRequest({event:request.event, userId:request.user, reply:"accepted"})}>Accept</button>
                            <button onClick={() => handlePlanRequest({event:request.event, userId:request.user, reply:"declined"})}>Decline</button>
                        </div>
                    </div>;
                    setRequests((arr) => [...arr, element])
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    return !isLoading?(
        <Wrapper>
            {requests.map(request => {
                return request;
            })}
        </Wrapper>
    ):(
        <Wrapper>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    .requests{
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.31);
        border-radius: var(--border-radius);
        padding: .5vw;
        align-items: center;
        margin-top: .5vw;
    }
    button{
        color: var(--primary-colour);
        background-color: rgba(255, 255, 255, 0.0);
        text-decoration: none;
        font-size: var(--paragraph-font-size);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: .2vw;
        margin: .5vw;
    }
    
`;

export default DisplayRequests;