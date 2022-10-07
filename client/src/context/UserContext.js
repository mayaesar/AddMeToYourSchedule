import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [isError, setIsError] = useState(null);
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState(null)

    // fetch user info 
    const getUserInfo = async () => {
        try {
            const res = await fetch(`/api/get-user/${userId}`);
            const data = await res.json();
            const info = data.data;
            // gets the data from the backend and stores them into useStates
            setCurrentUser(info)
        } catch (err) {
            setIsError(true);
        }
    }

    const getUsers = async () => {
        console.log("=== get users ===")
        try {
            const res = await fetch('/api/get-users');
            const data = await res.json();
            setUsers(data.data);
        } catch (err) {
            setIsError(true);
        }
    }
    
    //if user is signed in then it will fetch information
    useEffect(() => {
        console.log(userId)
        if (userId){
            getUserInfo();
            getUsers();
            setIsError(false);
        }
    }, [userId])



    //once everything is loaded then it will return 
    return(
        <UserContext.Provider value={{
            userId,
            setUserId,
            users,
            currentUser,
            isError,
            getUserInfo,
        }}>
            {children}
        </UserContext.Provider>
    )
}