import styled from "styled-components";

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
    .notification{
        display: flex;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.31);
        border-radius: var(--border-radius);
        padding: .5vw;
        align-items: center;
        margin-top: .5vw;
    }
`;

export default DisplayNotifications;