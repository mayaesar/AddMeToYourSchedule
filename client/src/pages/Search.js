import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import DisplayFriends from "../components/DisplayFriends";
import DisplayRequests from "../components/DisplayRequests";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {RotatingLines} from "react-loader-spinner"


const Search = () => {
    const { users, currentUser } = useContext(UserContext);

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
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
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