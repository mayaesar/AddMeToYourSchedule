import styled from "styled-components";

const SearchBar = (array) => {

    return(
        <Wrapper>
            <input placeholder="🔍 Search users">
            </input>
        </Wrapper>
    );
};

const Wrapper = styled.div`
input {
        width: 25vw;
        height: 2.3vw;
        padding-left: 1vw;
        font-size: var(--subheader-font-size);
        border-radius: var(--border-radius);
        border: var(--border);
    }
`;

export default SearchBar;