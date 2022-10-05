import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import {useAuth0} from '@auth0/auth0-react';
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import MySchedule from "./pages/MySchedule";
import FriendsList from "./pages/FriendsList";
import styled from "styled-components";

const App = () => {
  
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
          <Route path="/" element={<Feed />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sign-in" element={<Signin loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} user={user} />} />
          <Route path="/profile" element={<Profile logout={logout} />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-schedule" element={<MySchedule />} />
          <Route path="/friends-list" element={<FriendsList />} />
        </Routes>
      </Router>
};

const Wrapper = styled.div`

`;
export default App;
