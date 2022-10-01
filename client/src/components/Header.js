import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = ({currentUser}) => {
//console.log(currentUser)
    return(
        <Wrapper>
            <HeaderLinks to={"/sign-in"}>SignIn</HeaderLinks>
            <HeaderLinks to={"/"}>Feed</HeaderLinks>
            <HeaderLinks to={"/my-schedule"}>My Schedule</HeaderLinks>
            <HeaderLinks to={"/search"}>Search</HeaderLinks>
            <HeaderLinks to={"/notifications"}>Notifications</HeaderLinks>
            <HeaderLinks to={"/profile"}>profile</HeaderLinks>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    max-width: var(--max-width);
    border-bottom: var(--border) ;
    margin: auto;
    padding: 2vw;
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