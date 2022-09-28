import styled from "styled-components";

const DisplayEvent = (event) => {

    return(
        <Wrapper>
            <Container> 
                {/* on click open popup to send request */}
                <div className="eventContainer">
                    <p>Date</p>
                    <p>start - end time</p>
                </div>
                <div className="eventContainer">

                </div>
                <div className="eventContainer">

                </div>
                <div className="eventContainer">

                </div>
                <div className="eventContainer">

                </div>
                <div className="eventContainer">

                </div>
                <div className="eventContainer">

                </div>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
        width: 90%;
        padding-top: 1vw;
        margin: auto;
`;
const Container = styled.div`
    display: flex;
    gap: .5vw;
    overflow-x: scroll;
    .eventContainer {
        min-width: 14vw;
        border: var(--border);
        border-radius: var(--border-radius);
        height: 7vw;
        background-color: var(--secondary-colour);
        padding: 1vw;
    }
`;

export default DisplayEvent;