import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {RotatingLines} from "react-loader-spinner"

// user can search for other users,
// see friends,
// and reply to friend requests
const Search = () => {
    const { users, currentUser } = useContext(UserContext);

    return users !== null && currentUser !== null?(
        <Wrapper>
            <div className="search">
                <SearchBar users={users} currentUser={currentUser} />
            </div>
            <p className="subheader">Pending friend requests</p>
            <DisplayRequests friendRequests={currentUser.friendRequests} users={users} />
            <p className="subheader">Friends</p>
            <DisplayFriends friends={currentUser.friends} users={users}/>
        </Wrapper>
    ):(
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
};
const Wrapper = styled.div`
    min-height: 88vh;
    overflow: scroll;
    padding: 2vw;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.31);
    backdrop-filter: blur(8.6px);
    border-top: none;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    padding-top: 1vw;
    max-width: var(--max-width);
    margin: auto;
    font-size: 1vw;
    .subheader{
        margin-top: 1vw;
        font-size: var(--subheader-font-size);
        border-bottom: var(--border) ;
    }
    .search{
        max-width: 26vw;
        margin: auto;
    }
`;
const Loader = styled.div`
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.3);
    display: flex;
`;
export default Search;