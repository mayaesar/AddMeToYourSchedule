import { createContext, useState, useContext} from "react";
import { UserContext } from "./UserContext";
import moment from "moment"

export const FriendActionContext = createContext(null);
//will take care of any data manipulation, or retreiving that involves the users friends
export const FriendActionProvider = ({children}) => {
    const [isError, setIsError] = useState(false);
    const { 
        currentUser,
        userId,
        getUserInfo,
    } = useContext(UserContext);


    // add all fetches here-------------------------------------------------->
    // send a request to other user and modifies requested array
    const sendFriendRequest = async (userSentId) => {
        if(!userId) return;
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
    // handles the response of a friend request and updates for both users 
    const friendRequestHandler = async ({userId, reply}) => {
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
    // remove friend will update friends list on both sides
    const removeFriend = async (friend) => {
        const _id = currentUser._id;
        try {
            const res = await fetch('/api/remove-friend/',{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id, friend})
            })
            const data = await res.json();
            if (data.status !== 200) return setIsError(true)
            getUserInfo();
        } catch (err) {
            console.log(err)
            setIsError(true)
        }
    }
     // <-------------------------------------------------- add all fetches here
    return(
        <FriendActionContext.Provider 
        value={{
            isError,
            sendFriendRequest,
            friendRequestHandler,
            removeFriend,
        }}
        >
            {children}
        </FriendActionContext.Provider>
    );
}