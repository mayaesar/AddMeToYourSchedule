import {ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import EventForm from './EventForm';
import {Scheduler, Toolbar, WeekView, Appointments, AppointmentForm, DateNavigator, TodayButton, AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import { EventActionContext } from "../../context/EventActionContext";
import BasicLayout, {Select, BooleanBtn} from './BasicLayout';


const DisplaySchedule = () => {

    const {addEvent, schedulerData, isLoading, deleteEvent} = useContext(EventActionContext);
    const [events, setEvents] = useState(null);
    useEffect(() => {
        setEvents(schedulerData);
    }, [schedulerData])
    console.log(schedulerData)

    const handleChangeEvent = ({added, changed, deleted}) => {
        
        let data = null;
        if (added){
            data = added;
            console.log("=== added data ===");
            console.log(data);
            let description = null;
            if(data.notes){
                description = (data.notes);
            }
            const title = (data.title);
            const startDate = (data.startDate);
            const endDate = (data.endDate);
            const tags = [];
            if(data.tags){
                tags.push(data.tags);
            }
            addEvent(title, startDate, endDate, description, tags);
        }
        if (changed){
            data = changed;
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
        <Wrapper>
            <h1>Loading...</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 700px;
`;
export default DisplaySchedule;