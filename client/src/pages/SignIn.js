import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signin = ({loginWithRedirect, isAuthenticated, user}) => {
const [userId, setUserId] = useState(null);

const navigate = useNavigate();

// make sure the user cannot access this page if signed in


    // once the user is authenticated this useEffect will check if user exists in the database
    // if user does not exist it will update userId with 'notFound'
    useEffect(() => {
        if (isAuthenticated){
            console.log(isAuthenticated);
            console.log(user);
            
            const getId = async () => {
                console.log("=== finding User ===")
                try {
                    const response = await fetch(`/api/get-user-id/${user.email}`);
                    const json = await response.json();
                    if (response.ok == true){
                        console.log(json.data);
                        window.localStorage.setItem("userId", json.data);
                        setUserId(json.data);
                        navigate("/");
                    }
                    else{ 
                        setUserId("notFound");
                    }
                } 
                catch (err) {
                    setUserId("notFound")
                }
            } 
            getId();
        }
    }, [isAuthenticated])

    // if userId is updated it will create a new user ONLY if userId is = to 'notFound'
    useEffect(() => {
        if(userId == "notFound"){
            console.log("==== CREATING USER ====");
            const email = user.email;
            const name = `${user.given_name} ${user.family_name}`;
            const profileImg = user.picture;
            axios.post("/api/create-user", {email, name, profileImg})
            .then(data => {
                window.localStorage.setItem("userId", data.data);
                setUserId(data.data);
                navigate("/");
                
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
    }, [userId])

    return (
        <Wrapper>
            <h1>Hello, and welcome to Add Me To Your Schedule!</h1>
            <p>Before continuing to the site you must sign in</p>
            <button onClick={loginWithRedirect}>Sign In</button>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    width: 90%;
    margin: auto;
`;

export default Signin;