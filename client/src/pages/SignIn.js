import { useEffect, useState } from "react";
import styled from "styled-components";

const Signin = ({loginWithRedirect, isAuthenticated, user}) => {
const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (isAuthenticated){
            console.log(isAuthenticated);
            console.log(user);
            const getId = async () => {
                fetch(`/api/get-user-id/${user.email}`)
                .then(res => res.json())
                .then(data =>{
                    setUserId(data.data);
                })
                .catch(err => console.log(err.message))
            }
            const createUser = async () => {
                console.log("==== CREATING USER ====");
                const email = user.email;
                const name = `${user.given_name} ${user.family_name}`
                const profileImg = user.picture;
                fetch("/api/create-user", {
                    method:"POST",
                    headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                },
                    body: JSON.stringify({email, name, profileImg}),
                })
                .then(res => res.json())
                .then(data => {
                    setUserId(data.data);
                })
                .catch(err => console.log(err.message))
            }
            getId();
            console.log("==== USER ID ====")
            console.log(userId);
            if(userId === null){
                createUser();
            }
            window.localStorage.setItem("userId", userId);
        }
    }, [isAuthenticated])

    return (
        <Wrapper>
            <h1>Hello, and welcome to Add Me To Your Schedule!</h1>
            <p>Before continuing to the site you must make an account or log in</p>
            <button onClick={loginWithRedirect}>Sign In</button>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    width: 90%;
    margin: auto;
`;

export default Signin;