import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

export const Select = (props) => {
    return   <AppointmentForm.SelectProps {...props}/>
}
export const BooleanBtn = (props) => {
    return   <AppointmentForm.BooleanEditor {...props} readOnly/>
}

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {

    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ tags: nextValue });
    };

    return (
            <AppointmentForm.BasicLayout
                appointmentData={appointmentData}
                onFieldChange={onFieldChange}
                {...restProps}   
            >
                <AppointmentForm.Label text='Tags' type='title'/>
                <AppointmentForm.Select
                    value={appointmentData.tags}
                    onValueChange={onCustomFieldChange}
                    availableOptions={[{id:1, text:"abc", value:"tag1"}, {id:2, text:"abc", value:"tag2"}, {id:3, text:"abc", value:"tag3"}]}
                />
                
            </AppointmentForm.BasicLayout>
            
        
    );
};

export default BasicLayout;