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
                    matches.push(<p> {user.name} <button>addFriend</button></p>);
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
            <span className="searchbar">
                <input placeholder="🔍 Search users" 
                value={typedValue}
                onChange={getValue}/>
                <button onClick={() => setTypedValue("")}>Clear</button>
            </span>

            {suggestions? (
                <Suggestions>
                    {suggestions.map(element => {
                        return element;
                    })}
                </Suggestions>
            ):(
                <div className="noSuggestions">

                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .searchBar{
        
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

`

export default SearchBar;