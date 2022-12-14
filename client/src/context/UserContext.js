import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);
//will take care of any data manipulation, or retreiving that involves the user
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
    // gets all users 
    const getUsers = async () => {
        try {
            const res = await fetch('/api/get-users');
            const data = await res.json();
            setUsers(data.data);
        } catch (err) {
            setIsError(true);
        }
    }
    //any changes to the tag array
    const updateTag = async ({tag, friendId, change}) => {
        try {
            const res = await fetch(`/api/update-tags/${userId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({tag, friendId, change})
            });
            const data = await res.json();
            if (data.status !== 200) return setIsError(true);
            getUserInfo();

        } catch (err) {
            setIsError(true);
        }
    }

    //if user is signed in then it will fetch information
    useEffect(() => {
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
            updateTag,
        }}>
            {children}
        </UserContext.Provider>
    )
}