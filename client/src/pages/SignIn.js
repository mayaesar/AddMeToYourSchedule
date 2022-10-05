import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignIn = ({loginWithRedirect, isAuthenticated, user}) => {
const [currentUserId, setCurrentUserId] = useState(null);
const { setUserId, userId } = useContext(UserContext);

const navigate = useNavigate();

useEffect(() => {
    if(userId !== 'null'){
        navigate("/")
    }
    try {
        const result = window.localStorage.getItem("userId");
        if(result === "[object Object]"){
            window.localStorage.setItem("userId", currentUserId.data);
            console.log(window.localStorage.getItem("userId"))
            setUserId(currentUserId.data)
            navigate("/")
        }
        else{
            if(result !== 'null'){
                setUserId(currentUserId)
                navigate("/")
            }
        }
    } catch (error) {
        
    }
}, [currentUserId])

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
                        setCurrentUserId(json.data);
                    }
                    else{ 
                        setCurrentUserId("notFound");
                    }
                } 
                catch (err) {
                    setCurrentUserId("notFound")
                }
            } 
            getId();
        }
    }, [isAuthenticated])

    // if userId is updated it will create a new user ONLY if userId is = to 'notFound'
    useEffect(() => {
        if(currentUserId == "notFound"){
            console.log("==== CREATING USER ====");
            const email = user.email;
            const name = `${user.given_name} ${user.family_name}`;
            const profileImg = user.picture;
            axios.post("/api/create-user", {email, name, profileImg})
            .then(data => {
                window.localStorage.setItem("userId", data.data);
                setCurrentUserId(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
    }, [currentUserId])

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

export default SignIn;