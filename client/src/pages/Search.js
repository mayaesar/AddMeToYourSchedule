import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Search = () => {
    const { users, currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    return users !== null && currentUser !== null?(
        <Wrapper>
            <div className="search">
                <SearchBar users={users} currentUser={currentUser} />
            </div>
            <h2>Pending friend requests</h2>
            <DisplayRequests friendRequests={currentUser.friendRequests} users={users} />
            <h2>Friends</h2>
            <DisplayFriends friends={currentUser.friends} users={users}/>
        </Wrapper>
    ):(
        <Wrapper>
            <h1>Loading...</h1>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
    .search{
        max-width: 26vw;
        margin: auto;
    }
`;
export default Search;