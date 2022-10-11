import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import {RotatingLines} from "react-loader-spinner"

// to sign in
//cannot navigate anywhere else if not signed in
const SignIn = ({loginWithRedirect, isAuthenticated, user}) => {
const [currentUserId, setCurrentUserId] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const { setUserId } = useContext(UserContext);

useEffect(() => {
    try {
        const result = window.localStorage.getItem("userId");
        if(result === "[object Object]"){
            window.localStorage.setItem("userId", currentUserId.data);
            setUserId(currentUserId.data)
        }
        else{
            if(result !== null){
                setUserId(currentUserId)
            }
        }
    } catch (error) {
        
    }
}, [currentUserId])

    // once the user is authenticated this useEffect will check if user exists in the database
    // if user does not exist it will update userId with 'notFound'
    useEffect(() => {
        if (isAuthenticated){
            setIsLoading(true);
            
            const getId = async () => {
                try {
                    const response = await fetch(`/api/get-user-id/${user.email}`);
                    const json = await response.json();
                    if (response.ok == true){
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
            const email = user.email;
            const name = `${user.given_name} ${user.family_name}`;
            axios.post("/api/create-user", {email, name})
            .then(data => {
                window.localStorage.setItem("userId", data.data);
                setCurrentUserId(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
    }, [currentUserId])

    return isLoading === false?(
        <Wrapper>
            <SignInBox>
                <h1>Welcome to Add me to your Schedule!</h1>
                <p>Before continuing to the site you must sign in</p>
                <button onClick={loginWithRedirect}>Sign In</button>
            </SignInBox>
            
        </Wrapper>
    ):(
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
};
const Wrapper = styled.div`
    background-color: white;
    background-image:
        radial-gradient(at top left, #64B5F6, transparent),
        radial-gradient(at top right,#8a6efa, transparent),
        radial-gradient(at bottom left, #a24e9a, transparent);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    display: flex;
`;
const SignInBox = styled.div`
    padding: 2vw;
    width: 40vw;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.31);
    backdrop-filter: blur(8.6px);
    border-radius: var(--border-radius);

    button{
        color: var(--primary-colour);
        background-color: rgba(255, 255, 255, 0.0);
        text-decoration: none;
        font-size: var(--subheader-font-size);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: .5vw;
    }
    h1{
        font-size: 2vw;
        padding-bottom: 1vw;
    }
    p{
        padding-bottom: 1vw;
    }
`;

const Loader = styled.div`
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.3);
    display: flex;
`;

export default SignIn;