import {ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import EventForm from './EventForm';
import {Scheduler, Toolbar, WeekView, Appointments, AppointmentForm, DateNavigator, TodayButton, AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';
import { useContext } from "react";
import { EventActionContext } from "../../context/EventActionContext";
import BasicLayout, {Select} from './BasicLayout';




const DisplaySchedule = ({ eventList }) => {

    const {addEvent, schedulerData} = useContext(EventActionContext);



    const handleChangeEvent = ({added, changed, deleted}) => {
        console.log("=== commit changes ===", deleted)
        
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
            
            addEvent(title, startDate, endDate, description);
        }
        if (changed){
            data = changed;
        }
        if (deleted !== undefined){
            data = deleted;
        }
        
    }




    return (
        <Wrapper>
            <Scheduler data={schedulerData}>
                <ViewState />
                <EditingState  onCommitChanges={handleChangeEvent}/>
                <IntegratedEditing  />
                <WeekView cellDuration={60} startDayHour={6}/>
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip showOpenButton={true} showDeleteButton={true} showCloseButton={true}/>
                <AppointmentForm basicLayoutComponent={BasicLayout} selectPropsComponent={Select}/>
            </Scheduler>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 700px;
`;
export default DisplaySchedule;