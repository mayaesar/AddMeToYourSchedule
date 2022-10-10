import styled from "styled-components";
import DisplayRequests from "./DisplayRequests";

const DisplayNotifications = ({notifications}) => {
    
    return(
        <Wrapper>
            <div>
                {notifications.map(notification => {
                    return(
                        <div className="notification">
                            <p>{notification}</p>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`

`;

export default DisplayNotifications;