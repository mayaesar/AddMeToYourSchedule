import { useEffect, useState} from "react";
import styled from "styled-components";

const DisplayFriends = ({friends, users, removeFriend}) => {
    const [friendsArr, setFriendsArr] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(true);
        try {
            const arr = [];
            friends.map(friend => {
                users.map(user => {
                    if (friend === user._id){
                        const element = <div>
                            <p>{user.name}</p>
                            <button>+ tags</button>
                            <button onClick={() => removeFriend(friend)}>unfriend</button>
                        </div>
                        arr.push(element)
                    }
                })
            })
            setFriendsArr(arr)
        } catch (error) {
            
        }
        
    }, [friends])

    useEffect(() => {
        try {
            if(friendsArr.length >= 1){
                setIsLoading(false)
            }
        } catch (error) {
            
        }
    }, [friendsArr])

    return !isLoading && friendsArr?(
        <Wrapper>
            {friendsArr.map(friend => {
                return friend;
            })}
        </Wrapper>
    ):(
        <Wrapper>

        </Wrapper>
    )
};

const Wrapper = styled.div`

`;

export default DisplayFriends;