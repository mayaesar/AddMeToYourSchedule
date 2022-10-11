import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FriendActionContext } from "../context/FriendActionContext";

// search through users 
const SearchBar = ({users, currentUser}) => {
    const [suggestions, setSuggestions] = useState();
    const [typedValue, setTypedValue] = useState("");
    const {sendFriendRequest, removeFriend} = useContext(FriendActionContext);

    // this function will change depending on that users relationship
    // show pending, addfriend or remove friend 
    const getButton = (id) => {
        let result = (<button onClick={() => {
            sendFriendRequest(id)
            setTypedValue("")
        }}>addFriend</button>)
        try {
            currentUser.friends.map(friend => {
                if(friend === id){
                    result = <button onClick={() => {
                        removeFriend(friend)
                        setTypedValue("")
                    }}>Unfriend</button>
                }
            })
            currentUser.requested.map(request => {
                if(request.addUserId === id){
                    result = (<button disabled>Pending...</button>)
                }
            })
            currentUser.friendRequests.map(request => {
                if(request.userId === id){
                    result = (<button disabled>Pending...</button>)
                }
            })

            return result;

        } catch (err) { }
    }

    // will set the suggestions once user starts typing 
    const searchMatches = () => {
        if (users){
            const matches = []
            users.map(user => {
                const name = user.name.toLowerCase();
                if (name.search(typedValue.toLowerCase()) !== -1){
                    const id = user._id;
                    if (id !== currentUser._id){
                        matches.push(<p className="suggested">{user.name} {getButton(id)}</p>);
                    }
                }
            })
            setSuggestions(matches);
        }
    }
    
    // gets new suggestions every time user types
    useEffect(() => {
        setSuggestions(null);
        if (typedValue.length >= 1){
            searchMatches();
        }
    }, [typedValue])

    //set user typed value when changed
    const getValue = (event) => {
        setTypedValue(event.target.value);
    };

    return(
        <Wrapper>
            <div className="searchBar">
                <input placeholder="🔍 Search users" 
                value={typedValue}
                onChange={getValue}/>
                <button onClick={() => setTypedValue("")}>Clear</button>
            </div>

            {suggestions? (
                <Suggestions>
                    {suggestions.map(element => {
                        return element;
                    })}
                </Suggestions>
            ):(
                <></>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 2vw;
    .searchBar{
        display: flex;
        gap: 2vw;
    }
    input {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        width: 25vw;
        height: 2.3vw;
        padding-left: 1vw;
        font-size: var(--subheader-font-size);
        border-radius: var(--border-radius);
        border: var(--border);
    }
    button{
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        color: var(--primary-colour);
        background-color: rgba(255, 255, 255, 0.0);
        text-decoration: none;
        font-size: var(--subheader-font-size);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: .2vw;
        margin-left: 1vw;
    }
    
    
`;
const Suggestions = styled.div`
    padding-top: 1vw;
    border-radius: var(--border-radius);
    margin-left: -2vw;
    z-index: 1;
    width: 25vw;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.31);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    display: grid;
    gap: 1vw;
    max-height: 12vw;
    overflow: scroll;

    .suggested{
        padding: 0.5vw;
        border-bottom: 1px solid rgba(255, 255, 255, 0.31);
    }
`

export default SearchBar;