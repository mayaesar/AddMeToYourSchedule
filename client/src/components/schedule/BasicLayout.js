import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";

export const Select = (props) => {
    return   <AppointmentForm.SelectProps {...props}/>
}
export const BooleanBtn = (props) => {
    return   <AppointmentForm.BooleanEditor {...props} readOnly/>
}

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