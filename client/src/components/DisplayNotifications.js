import styled from "styled-components";
import DisplayRequests from "./DisplayRequests";

const DisplayNotifications = ({notifications}) => {
    // make an array of requests 
    const requests = [];
    // another array of non-requests
    
    return(
        <Wrapper>
            <h2>Requests</h2>
            <div>
                <DisplayRequests array={requests}/>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`

`;

export default DisplayNotifications;