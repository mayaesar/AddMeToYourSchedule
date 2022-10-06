import styled from "styled-components"

const EventForm = ({formType}) => {


    return (
        <Wrapper> 
            <form>
                <div>
                    <input type='text' placeholder="Title"/>
                </div>
                <div>
                    <input type='date' />
                </div>
                
            </form>
        </Wrapper>
    );
}
const Wrapper = styled.div`

`;

export default EventForm;