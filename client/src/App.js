import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import {useAuth0} from '@auth0/auth0-react';
import Header from "./components/Header";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import MySchedule from "./pages/MySchedule";
import FriendsList from "./pages/FriendsList";
import styled from "styled-components";
import SignIn from "./pages/SignIn";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";


const App = () => {
const [isSignedIn, setIsSignedIn] = useState(false);
const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if(currentUser !== null){
      setIsSignedIn(true)
    }
    else{
      setIsSignedIn(false)
    }
  },[currentUser])

  useEffect(() => {
    try {
      const result = (window.localStorage.getItem("userId"))
      if(result !== null){
        setIsSignedIn(true)
      }
      else{
        setIsSignedIn(false)
      }
    } catch (error) {
      setIsSignedIn(false)
    }
  },[])

// used for 0auth
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();

    return <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={isSignedIn?<Feed />:<Navigate to="/sign-in"/>} />
        <Route path="/search" element={isSignedIn?<Search />:<Navigate to="/sign-in"/>} />
        <Route path="/sign-in" element={isSignedIn?<Navigate to="/"/>:<SignIn loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="/profile" element={isSignedIn?<Profile logout={logout}/>:<Navigate to="/sign-in"/>} />
        <Route path="/notifications" element={isSignedIn?<Notifications />:<Navigate to="/sign-in"/>} />
        <Route path="/my-schedule" element={isSignedIn?<MySchedule />:<Navigate to="/sign-in"/>} />
        <Route path="/friends-list" element={isSignedIn?<FriendsList />:<Navigate to="/sign-in"/>} />
      </Routes>
    </Router>
};

const Wrapper = styled.div`

`;
export default App;
