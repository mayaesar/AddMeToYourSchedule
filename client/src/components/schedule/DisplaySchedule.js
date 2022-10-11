import {ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {Scheduler, Toolbar, WeekView, Appointments, AppointmentForm, DateNavigator, TodayButton, AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { EventActionContext } from "../../context/EventActionContext";
import BasicLayout, {Select, BooleanBtn} from './BasicLayout';
import {RotatingLines} from "react-loader-spinner"

const DisplaySchedule = () => {

    const {addEvent, schedulerData, isLoading, deleteEvent, updateEvent} = useContext(EventActionContext);
    const [events, setEvents] = useState(null);
    // updates the events everytime theres a change to scheduler data 
    // allow events to be automatically updated 
    useEffect(() => {
        setEvents(schedulerData);
    }, [schedulerData])

    // any time user creates edit or deletes an item its being handeled in this function
    const handleChangeEvent = ({added, changed, deleted}) => {
        
        let data = null;
        if (added){
            data = added;
            let description = null;
            if(data.notes){
                description = (data.notes);
            }
            const title = (data.title);
            const startDate = (data.startDate);
            const endDate = (data.endDate);
            let tags = null;
            if(data.tags){
                tags = (data.tags);
            }
            addEvent(title, startDate, endDate, description, tags);
        }
        if (changed){
            data = changed;
            updateEvent(data)
        }
        if (deleted !== undefined){
            data = deleted;
            deleteEvent(data);
        }
        
    }


    return !isLoading && events !== null ?(
        <Wrapper>
            <Scheduler data={events}>
                <ViewState />
                <EditingState  onCommitChanges={handleChangeEvent}/>
                <IntegratedEditing  />
                <WeekView cellDuration={60} startDayHour={6}/>
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip showOpenButton={true} showDeleteButton={true} showCloseButton={true}/>
                <AppointmentForm basicLayoutComponent={BasicLayout} selectPropsComponent={Select} booleanEditorComponent={BooleanBtn}/>
            </Scheduler>
        </Wrapper>
    ):(
        <Loader>
            <RotatingLines strokeColor="#2d2e2e"/>
        </Loader>
    )
}

const Wrapper = styled.div`
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    max-height: 78vh;
    overflow: scroll;
    padding: 1vw;
    margin: 1vw;
    border-radius: var(--border-radius);
    background: white;
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
export default DisplaySchedule;