import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ViewState} from '@devexpress/dx-react-scheduler';
import {Scheduler, Toolbar, WeekView, Appointments, DateNavigator, TodayButton} from '@devexpress/dx-react-scheduler-material-ui';
import Logout from "../components/Logout";
import { UserContext } from "../context/UserContext";
import { EventActionContext } from "../context/EventActionContext";
import {RotatingLines} from "react-loader-spinner"


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
                <div className="icon">profile icon</div>
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
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
    
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
    display: flex;
    gap: 1vw;
    border-bottom: var(--border);
    padding-bottom: 1vw;
    margin-bottom: 2vw;
    .icon{
        border: var(--border);
        width: 8vw;
        height: 8vw;
    }
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
    width: 90%;
    margin: auto;
    .aboveSchedule{
        display: flex;
        gap: 50vw;
    }
    h2{
        font-size: var(--subheader-font-size);
        padding-bottom: 1vw;
    }
    .schedule{

        height: 700px;
        max-height: 30vw;
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