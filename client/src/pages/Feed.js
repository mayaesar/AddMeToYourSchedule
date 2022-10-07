import styled from "styled-components";
import DisplayFeed from "../components/DisplayFeed";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Feed = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

//fetch users feed
const array = [];
    return currentUser !== null ?(
        <Wrapper>
            <DisplayFeed array={array}/>
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
`;

export default Feed;
