import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {

    return(
        <Wrapper>
            <HeaderLinks to={"/"}>SignIn</HeaderLinks>
            <HeaderLinks to={"/"}>Feed</HeaderLinks>
            <HeaderLinks to={"/"}>My Schedule</HeaderLinks>
            <HeaderLinks to={"/"}>Search</HeaderLinks>
            <HeaderLinks to={"/"}>Notifications</HeaderLinks>
            <HeaderLinks to={"/"}>profile</HeaderLinks>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 90%;
    margin: auto;
    margin-top: 2vw;
`;
const HeaderLinks = styled(Link)`
    color: var(--primary-colour);
    text-decoration: none;
    font-size: var(--subheader-font-size);

    &&:hover{
        color: var(--secondary-colour);
    }
`;
export default Header;