import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import moment from "moment"

export const FriendActionContext = createContext(null);

export const FriendActionProvider = ({children}) => {
    const [isError, setIsError] = useState(false);
    const { 
        currentUser,
        userId,
        getUserInfo,
    } = useContext(UserContext);


    // add all fetches here-------------------------------------------------->
    const sendFriendRequest = async (userSentId) => {
        if(!userId) return;
        console.log("===friends id===")
        console.log(userSentId)
        const timeStamp = moment().format();
        
        try {
            const res = await fetch('/api/update-user', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id:userId, requested:{addUserId: userSentId, timestamp: timeStamp}})
            });
            const json = await res.json();
            if(json.status === 200){
                getUserInfo();
            }
            else{
                console.log(json.message);
                setIsError(true);
            }
        } catch (err) {
            console.log(err.message);
            setIsError(true);
        }
    }
    const friendRequestHandler = async ({userId, reply}) => {
        console.log("=== friend request handler ===")
        const _id = currentUser._id;
        
        try {
            const res = await fetch('/api/friend-request', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id, userId, reply})
            });
            const json = await res.json();
            if(json.status === 200){
                console.log(json)
            }
            else{
                console.log(json.message);
                setIsError(true);
            }
        } catch (err) {  
            console.log(err.message);
            setIsError(true);
        }
    }
     // <-------------------------------------------------- add all fetches here
    return(
        <FriendActionContext.Provider 
        value={{
            isError,
            sendFriendRequest,
            friendRequestHandler,
        }}
        >
            {children}
        </FriendActionContext.Provider>
    );
}