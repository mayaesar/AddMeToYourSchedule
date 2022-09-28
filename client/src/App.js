import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import MySchedule from "./pages/MySchedule";
import FriendsList from "./pages/FriendsList";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/friends-list" element={<FriendsList />} />
      </Routes>
    </Router>
  );
}

export default App;
