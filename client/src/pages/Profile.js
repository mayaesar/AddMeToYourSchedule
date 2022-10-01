import { Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "../components/Logout";
const Profile = ({logout, setCurrentUser}) => {

    return(
        <Wrapper>
            <Top>
                <div className="icon">profile icon</div>
                <div className="info">
                    <p>@handler</p>
                    <p>Name</p>
                    <div className="buttons">
                        <Buttons to={"/friends-list"}>
                            My friends
                        </Buttons>
                        <Logout logout={logout} setCurrentUser={setCurrentUser}/>
                    </div>
                </div>
            </Top>
            <Schedule>
                <h2>My Schedule</h2>
                <div></div>
            </Schedule>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    padding-top: 1vw;
    width: 90%;
    max-width: var(--max-width);
    margin: auto;
`;
const Top = styled.div`
    display: flex;
    gap: 1vw;
    border-bottom: var(--border);
    padding-bottom: 1vw;
    margin-bottom: 1vw;
    .icon{
        border: var(--border);
        width: 10vw;
        height: 10vw;
    }
    .info{
        padding-top: 1vw;
        display: grid;
    }
    .buttons{
        display: flex;
        gap: 1.5vw;
        height: 2.2vw;
    }
`;
const Buttons = styled(Link)`
    color: var(--primary-colour);
    text-decoration: none;
    font-size: var(--paragraph-font-size);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: .5vw;
`;
const Schedule = styled.div`

    h2{
        font-size: var(--subheader-font-size);
        padding-bottom: 1vw;
    }
    div{
        border: var(--border);
        height: 40vw;
    }
`;
export default Profile;