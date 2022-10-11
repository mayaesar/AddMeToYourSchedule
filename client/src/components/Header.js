import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";


const Header = () => {
    const { currentUser } = useContext(UserContext);

    return currentUser?(
        <Wrapper>
            <HeaderLinks to={"/"}>Feed</HeaderLinks>
            <HeaderLinks to={"/my-schedule"}>My Schedule</HeaderLinks>
            <HeaderLinks to={"/search"}>Search</HeaderLinks>
            <HeaderLinks to={"/notifications"}>Notifications</HeaderLinks>
            <HeaderLinks to={"/profile"}>Profile</HeaderLinks>
        </Wrapper>
    ):(
        null
    )
};
const Wrapper = styled.div`
    padding: 2vw;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    
    border: 1px solid rgba(255, 255, 255, 0.31);
    backdrop-filter: blur(8.6px);
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    max-width: var(--max-width);
    margin: auto;
    border-bottom: none;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
`;
const HeaderLinks = styled(Link)`
    text-align: center;
    color: var(--primary-colour);
    text-decoration: none;
    font-size: var(--subheader-font-size);

    &&:hover{
        color: var(--secondary-colour);
    }
`;
export default Header;