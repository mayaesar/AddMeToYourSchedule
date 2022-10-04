import {ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import EventForm from './EventForm';
import {Scheduler, Toolbar, WeekView, Appointments, AppointmentForm, DateNavigator, TodayButton, AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';

const schedulerData = [
    { startDate: '2022-10-05T10:45', endDate: '2022-10-05T13:00', title: 'Meeting' },
    { startDate: '2022-10-04T12:00', endDate: '2022-10-04T13:30', title: 'Go to a gym' },
];

const DisplaySchedule = (eventList) => {
    
    const handleChanges = ({addEvent, updateEvent, deleteEvent}) => {

    }


    return (
        <Wrapper>
            <Scheduler data={schedulerData}>
                <ViewState />
                <EditingState />
                <IntegratedEditing />
                <WeekView cellDuration={60} startDayHour={6}/>
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip showOpenButton={true} showDeleteButton={true} onDeleteButtonClick={(deleteEvent) => handleChanges(deleteEvent)} showCloseButton={true}/>
                <AppointmentForm />
            </Scheduler>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 700px;
`;
export default DisplaySchedule;