import styled from "styled-components";

const Logout = ({logout, setUserId}) => {
    // this will update 0auth, userContext and localStorage that the user has signed out then bring user back to sign in page 
    const handleLogout = () => {
        logout();
        window.localStorage.removeItem("userId");
        setUserId(null);
        //navigate("/sign-in");
    }
    return (
        <Wrapper>
            <button onClick={() => handleLogout()}>logout</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    button{
        background-color: rgba(255, 255, 255, 0.0);
        color: var(--primary-colour);
        text-decoration: none;
        font-size: var(--paragraph-font-size);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: .5vw;
    }
`;
export default Logout;