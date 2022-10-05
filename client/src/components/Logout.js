import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logout = ({logout, setUserId}) => {
    const navigate = useNavigate();
    // this will update 0auth, userContext and localStorage that the user has signed out then bring user back to sign in page 
    const handleLogout = () => {
        logout();
        window.localStorage.setItem("userId", null);
        setUserId(null);
        navigate("/sign-in");
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