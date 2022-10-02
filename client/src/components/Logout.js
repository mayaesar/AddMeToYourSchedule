import styled from "styled-components";

const Logout = ({logout, setCurrentUser}) => {

    const handleLogout = () => {
        logout();
        window.localStorage.setItem("userId", null);
    }
    return (
        <Wrapper>
            <button onClick={() => handleLogout()}>logout</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`

`;
export default Logout;