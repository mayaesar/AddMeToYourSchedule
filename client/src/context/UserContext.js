import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [isError, setIsError] = useState(null);
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    // user will hold name, email, profileImg and scheduleId
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState(null);
    const [tags, setTags] = useState(null);
    const [friendRequests, setFriendRequests] = useState(null);
    const [planRequests, setPlanRequests] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [isUpdated, setIsUpdated] = useState(true);
    

    // fetch user info 
    const getUserInfo = async () => {
        try {
            const res = await fetch(`/api/get-user/${userId}`);
            const data = await res.json();
            const info = data.data;
            // gets the data from the backend and stores them into useStates
            setUser({'name': info.name, 'email':info.email, 'profileImg':info.profileImg, 'scheduleId':info.scheduleId});
            setFriends(info.friends);
            setTags(info.tags);
            setFriendRequests(info.friendRequests);
            setPlanRequests(info.planRequests);
            setNotifications(info.notifications);
        } catch (err) {
            setIsError(true);
        }
    }
    //if user is signed in then it will fetch information
    useEffect(() => {
        if (userId !== null){
            getUserInfo();
            setIsError(false);
        }
    }, [userId])

    //once everything is loaded then it will return 
    if((user !== null)&&(friends !== null)&&(tags !== null)&&(friendRequests !== null)&&(planRequests !== null)&&(notifications !== null)){
        return(
            <UserContext.Provider value={{
                userId,
                setUserId,
                user,
                setFriends,
                friends,
                setTags,
                tags,
                setFriendRequests,
                friendRequests,
                setPlanRequests,
                planRequests,
                setNotifications,
                notifications,
                setIsError,
                isError,
                setIsUpdated,
                isUpdated,
            }}>
                {children}
            </UserContext.Provider>
        )
    }
    
}