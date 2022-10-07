import styled from "styled-components";
import DisplayEvent from "./DisplayEvent";

const DisplayFeed = (array) => {
    const event = null;
    return(
        <Wrapper>
            <div className="event">
                <p>@Friends's Handle - <span>Friend's name</span></p>
                <DisplayEvent event={event} />
            </div>
            <div className="event">
                <p>@Friends's Handle - <span>Friend's name</span></p>
                <DisplayEvent event={event} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    .event{
        margin-bottom: 1vw;
        padding: 1vw;
        border: var(--border);
        height: 12vw;
    }
`;

export default DisplayFeed;