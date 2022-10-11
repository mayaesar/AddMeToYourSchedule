import { useEffect, useState} from "react";
import styled from "styled-components";
import TagModal from './TagModal'

const DisplayFriends = ({friends, users, removeFriend}) => {
    const [friendsArr, setFriendsArr] = useState();
    const [isLoading, setIsLoading] = useState();
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(null)

    useEffect(() => {
        setIsLoading(true);
        try {
            const arr = [];
            friends.map(friend => {
                users.map(user => {
                    if (friend === user._id){
                        const element = <div>
                            <p>{user.name}</p>
                            <button onClick={() => {
                                    setModal(user)
                                    setShow(true)
                                }}>+ tags</button>
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
            {modal?(<TagModal show={show} modal={modal} onClose={() => setShow(false)}/>):(null)}
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
    button{
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        color: var(--primary-colour);
        background-color: rgba(255, 255, 255, 0.0);
        text-decoration: none;
        font-size: var(--paragraph-font-size);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: .2vw;
    }
`;

export default DisplayFriends;