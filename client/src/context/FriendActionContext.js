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
    const friendRequestHandler = (answer) => {
        
    }
     // <-------------------------------------------------- add all fetches here
    return(
        <FriendActionContext.Provider 
        value={{
            isError,
            sendFriendRequest,
        }}
        >
            {children}
        </FriendActionContext.Provider>
    );
}