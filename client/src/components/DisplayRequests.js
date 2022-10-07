import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FriendActionContext } from "../context/FriendActionContext";

const DisplayRequests = ({friendRequests, planRequests, users}) => {
    const {isError} = useContext(FriendActionContext);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState();

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
            friendRequests.map(request => {
                users.map(user => {
                    if (request.userId === user._id){
                        const element = <div className="requests">
                        <span>
                            <h2>{user.name}</h2>
                            <p>has sent you a friend request</p>
                            <p>{request.timestamp}</p>
                        </span>
                        <span>
                            <button>Accept</button>
                            <button>Decline</button>
                        </span>
                    </div>;
                    setRequests((arr) => [...arr, element])
                    }
                })
            })
        } catch (error) {
            setRequests((arr) => [...arr, <h2>You have replied tofriend requests</h2>])
        }
        console.log("=== getting plan requests ===")
        try {
            planRequests.map(request => {
                users.map(user => {
                    if (request.userId === user._id){
                        const element = <div className="requests">
                        <span>
                            <h2>{user.name}</h2>
                            <p>has sent you a request on your event called {request.event.title} on {request.event.startDate}</p>
                            <p>{request.timestamp}</p>
                        </span>
                        <span>
                            <button>Accept</button>
                            <button>Decline</button>
                        </span>
                    </div>;
                    setRequests((arr) => [...arr, element])
                    }
                })
            })
        } catch (error) {
            setRequests((arr) => [...arr, <h2>You have replied to all event requests</h2>])
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
            <h1>loading...</h1>
        </Wrapper>
    )
};

const Wrapper = styled.div`

`;

export default DisplayRequests;