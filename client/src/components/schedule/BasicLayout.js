import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";

// creates the tag selector for the form 
export const Select = (props) => {
    return   <AppointmentForm.SelectProps {...props}/>
}

// makes so that the all day and repeat function cannot be clicked
export const BooleanBtn = (props) => {
    return   <AppointmentForm.BooleanEditor {...props} readOnly/>
}

// gets the appointment form from react scheduler 
// allows me to add Select to the form 
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const {currentUser} = useContext(UserContext);
    const [tags, setTags] = useState();
    
    useEffect(() => {
        if(currentUser){
            const arr = [];
            currentUser.tags.map(item => {
                const element = {
                    id:item.tag,
                    text:item.tag,
                    value:item,
                }
                arr.push(element)
            })
            setTags(arr);
        }
    },[currentUser])

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
                    value={appointmentData.tags?appointmentData.tags:""}
                    onValueChange={onCustomFieldChange}
                    availableOptions={tags}
                />
                
            </AppointmentForm.BasicLayout>
            
        
    );
};

export default BasicLayout;