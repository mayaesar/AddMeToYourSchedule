import styled from "styled-components"

const EventForm = ({formType}) => {


    return formType === 'default'?(
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
    ):(
        <Wrapper> 
            <form>
            <input type='text' placeholder="Title"/>
            </form>
        </Wrapper>
    );
}
const Wrapper = styled.div`

`;

export default EventForm;