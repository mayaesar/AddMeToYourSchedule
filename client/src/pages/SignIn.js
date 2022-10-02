import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signin = ({loginWithRedirect, isAuthenticated, user}) => {
const [userId, setUserId] = useState(null);
//const [IsError, setIsError] = useState(null);

const navigate = useNavigate();

    useEffect(() => {
        let user = null;
        try {
            user = window.localStorage.getItem("userId");
            if(user !== null){
                navigate("/");
            }
        } catch (error) {
            console.log("Waiting for user to sign in...")
        }
    },[])

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
                        window.localStorage.setItem("userId", json.data.data);
                        setUserId(json.data.data);
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