import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FriendActionContext } from "../context/FriendActionContext";
import moment from "moment";
import { EventActionContext } from "../context/EventActionContext";

const DisplayRequests = ({friendRequests, planRequests, users}) => {
    const {isError, friendRequestHandler} = useContext(FriendActionContext);
    const {handlePlanRequest} = useContext(EventActionContext);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState();

    console.log(planRequests)
    useEffect(() => {
        if(friendRequests !== undefined || planRequests !== undefined){
            setRequests([])
            console.log(friendRequests)
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


    const getRequests = () => {
        console.log("=== getting friend requests ===")
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
        console.log("=== getting plan requests ===")
        try {
            planRequests.map(request => {
                users.map(user => {
                    if (request.user === user._id){
                        console.log(user)
                        const startDate = moment(request.event.startDate).format('MMMM Do');
                        const element = <div className="requests">
                        <span>
                            <h2>{user.name}</h2>
                            <p>has sent you a request on your event called {request.event.title} on {startDate}</p>
                        </span>
                        <span>
                            <button onClick={() => handlePlanRequest({event:request.event, userId:request.user, reply:"accepted"})}>Accept</button>
                            <button onClick={() => handlePlanRequest({event:request.event, userId:request.user, reply:"declined"})}>Decline</button>
                        </span>
                    </div>;
                    setRequests((arr) => [...arr, element])
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
        console.log("=== done ===")
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

`;

export default DisplayRequests;