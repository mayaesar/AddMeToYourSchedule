import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ViewState} from '@devexpress/dx-react-scheduler';
import {Scheduler, Toolbar, WeekView, Appointments, DateNavigator, TodayButton} from '@devexpress/dx-react-scheduler-material-ui';
import Logout from "../components/Logout";
import { UserContext } from "../context/UserContext";
import { EventActionContext } from "../context/EventActionContext";
import {RotatingLines} from "react-loader-spinner"

// user can view friends list and schedule 
// and can logout 
const Profile = ({logout}) => {
    //gets user information
    const {schedulerData, isLoading} = useContext(EventActionContext);
    const { setUserId, currentUser, isError } = useContext(UserContext);
    const [events, setEvents] = useState(null);
    
    useEffect(() => {
        setEvents(schedulerData);
    }, [schedulerData])

    if (isError){
        return(
            <Wrapper>
                <h1>Error</h1>
            </Wrapper>
        );
    }
    
    return currentUser !== null && !isLoading && events?(
        <Wrapper>
            <Top>
                <div className="info">
                    <p>{currentUser.name}</p>
                    <div className="buttons">
                        <Buttons to={"/friends-list"}>
                            My friends
                        </Buttons>
                        <Logout logout={logout} setUserId= {setUserId}/>
                    </div>
                </div>
            </Top>
            <Schedule>
                <div className="aboveSchedule">
                    <h2>My Schedule</h2>
                    <Btn to="/my-schedule">Edit</Btn>
                </div>
                
                <div className="schedule">
                    <Scheduler data={events}>
                    <ViewState />
                    <WeekView cellDuration={60} startDayHour={6}/>
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    </Scheduler>
                </div>
            </Schedule>
        </Wrapper>
    ):(
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
};
const Wrapper = styled.div`
    min-height: 88vh;
    overflow: scroll;
    padding: 2vw;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.31);
    backdrop-filter: blur(8.6px);
    border-top: none;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    padding-top: 1vw;
    max-width: var(--max-width);
    margin: auto;
    font-size: 1vw;
    
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
const Top = styled.div`
    padding: 1vw;
    font-size: 1.2vw;
    height: 16vh;
    display: flex;
    gap: 1vw;
    border-bottom: var(--border);
    padding-bottom: 1vw;
    margin-bottom: 2vw;
    .info{
        display: grid;
        gap: 2.5vw;
    }
    .buttons{
        display: flex;
        gap: 1.5vw;
        height: 2.2vw;
    }
`;
const Buttons = styled(Link)`
    color: var(--primary-colour);
    text-decoration: none;
    font-size: var(--paragraph-font-size);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: .5vw;
`;
const Schedule = styled.div`
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    padding: 1vw;
    margin: 1vw;
    border-radius: var(--border-radius);
    background: white;
    .aboveSchedule{
        display: flex;
        gap: 40vw;
    }
    h2{
        font-size: var(--subheader-font-size);
        padding-bottom: 1vw;
        color: #717171;
    }
    .schedule{
        min-height: 54vh;
        max-height: 54vh;
        overflow: scroll;
    }

`;

const Btn = styled(Link)`
    border: var(--border);
    border-radius: var(--border-radius);
    border-color:var(--secondary-colour);
    color: var(--secondary-colour);
    text-decoration: none;
    padding: .5vw;
    padding-left: 1vw;
    padding-right: 1vw;
    margin: auto;

`;
export default Profile;