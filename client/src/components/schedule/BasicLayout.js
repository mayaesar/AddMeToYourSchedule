import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {

    return (
            <AppointmentForm.BasicLayout
                appointmentData={appointmentData}
                onFieldChange={onFieldChange}
                {...restProps}   
            >
            </AppointmentForm.BasicLayout>
            
        
    );
};

export default BasicLayout;