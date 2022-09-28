import styled from "styled-components";
import DisplayFeed from "../components/DisplayFeed";

const Feed = () => {
//fetch users feed
const array = [];
    return(
        <Wrapper>
            <DisplayFeed array={array}/>
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
