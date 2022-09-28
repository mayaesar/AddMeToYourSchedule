import styled from "styled-components";

const MySchedule = () => {
// use the scheduler-react npm
//fetch user's schedule
    return(
        <Wrapper>
            <h1>
                My Schedule
            </h1>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
`;
export default MySchedule;