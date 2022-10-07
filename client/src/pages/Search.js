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

    useEffect(() => {
        try {
            const result = window.localStorage.getItem("userId");
            if (result === "null"){
                navigate("/sign-in")
            }
        } catch (error) {
            navigate("/sign-in")
        }
    }, [])

// in search there will be 3 lists
// users that aren't friends
// pending
// friends
const array = [];

    return users !== null && currentUser !== null?(
        <Wrapper>
            <div className="search">
                <SearchBar users={users} currentUser={currentUser}/>
            </div>
            <h2>Friends</h2>
            <DisplayFriends friends={currentUser.friends}/>
            <h2>Pending requests</h2>
            <DisplayRequests friendRequest={currentUser.friendRequest}/>
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