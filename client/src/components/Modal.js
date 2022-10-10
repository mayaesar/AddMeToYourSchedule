import styled from "styled-components"
import moment from "moment"

const Modal = ({modal, show, handleClick, onClose}) => {

    let start = null;
    let end = null;
    if (show){
        start = moment(modal.startDate).format('MMMM Do, h:mm a');
        end = moment(modal.endDate).format('h:mm a')
    }
    
    
    return show?(
        <Wrapper>
            <div className="modalContent">
                <h1>{modal.title}</h1>
                <p>Time of event: {start} - {end}</p>
                <p>Description: {modal.description}</p>
                <button onClick={() => handleClick(modal)}>Send request to join</button>
                <button onClick={() => onClose()}>Close</button>
            </div>
        </Wrapper>
    ):(
        null
    )
}
const Wrapper = styled.div`
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    .modalContent{
        padding: 2vw;
        width: 500px;
        background-color: white;
    }
    p, button{
        margin-top: 1vw;
    }

`;
export default Modal;