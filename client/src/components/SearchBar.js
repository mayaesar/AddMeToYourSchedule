import { useState, useEffect } from "react";
import styled from "styled-components";

const SearchBar = ({users}) => {
    const [suggestions, setSuggestions] = useState();
    const [typedValue, setTypedValue] = useState("");

    const searchMatches = () => {
        if (users){
            const matches = []
            users.map(user => {
                const name = user.name.toLowerCase();
                if (name.search(typedValue.toLowerCase()) !== -1){
                    matches.push(<p className="suggested"><img src=""/> {user.name} <button>addFriend</button></p>);
                }
            })
            setSuggestions(matches);
        }
    }
    useEffect(() => {
        setSuggestions(null);
        if (typedValue.length >= 1){
            searchMatches();
        }
    }, [typedValue])

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
        width: 25vw;
        height: 2.3vw;
        padding-left: 1vw;
        font-size: var(--subheader-font-size);
        border-radius: var(--border-radius);
        border: var(--border);
    }
    
`;
const Suggestions = styled.div`
    padding-top: 1vw;
    z-index: 1;
    max-width: 25vw;
    background-color: lightgray;
    display: grid;
    gap: 1vw;
    max-height: 35vw;
    overflow: scroll;

    .suggested{
        padding: 0.5vw;
        border-bottom: var(--border);
    }
`

export default SearchBar;