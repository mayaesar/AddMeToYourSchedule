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
            let tags = null;
            if(data.tags){
                tags = (data.tags);
            }
            addEvent(title, startDate, endDate, description, tags);
        }
        if (changed){
            console.log("=== changed data ===");
            data = changed;
            console.log(data)
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
    height: 700px;
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