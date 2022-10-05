import {ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import EventForm from './EventForm';
import {Scheduler, Toolbar, WeekView, Appointments, AppointmentForm, DateNavigator, TodayButton, AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';
import { useContext } from "react";
import { EventActionContext } from "../../context/EventActionContext";
import BasicLayout from './BasicLayout';

const schedulerData = [
    { _id:123, startDate: '2022-10-05T10:45', endDate: '2022-10-05T13:00', title: 'Meeting' },
    { _id:223, startDate: '2022-10-04T12:00', endDate: '2022-10-04T13:30', title: 'Go to a gym' },
];

const DisplaySchedule = ({ eventList }) => {

    const {addEvent, Joining} = useContext(EventActionContext);
    console.log("=== Event list ===")
    console.log(eventList)



    const handleChangeEvent = ({added, changed, deleted}) => {
        console.log("=== commit changes ===")
        let data = null;
        if (added){
            data = added;
            const title = (data.title);
            const startDate = (data.startDate);
            const endDate = (data.endDate);
            addEvent(title, startDate, endDate);
        }
        if (changed){
            data = changed;
        }
        if (deleted === undefined){
            data = deleted;
        }
        console.log(data);
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
                <AppointmentForm basicLayoutComponent={BasicLayout}/>
            </Scheduler>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 700px;
`;
export default DisplaySchedule;