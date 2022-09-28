import styled from "styled-components";
import DisplayRequests from "./DisplayRequests";

const DisplayNotifications = (array) => {
    // make an array of requests 
    const requests = [];
    // another array of non-requests
    const notifications = [];
    return(
        <Wrapper>
            <div className="requests">
                <h2>Requests</h2>
                <div>
                    <DisplayRequests array={requests}/>
                </div>
            </div>
            <div className="notifications">
                insert notifications here...
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`

`;

export default DisplayNotifications;