import styled from "styled-components"
import moment from "moment"

// this is the pop up for the send a plan request on the feed page 
// also gives information on the event 
const Modal = ({modal, show, handleClick, onClose}) => {

    let start = null;
    let end = null;
    if (show){
        start = moment(modal.startDate).format('MMMM Do, h:mm a');
        end = moment(modal.endDate).format('h:mm a')
    }
    
    // if show is true the modal will appear
    // can send join request 
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
    z-index: 1;
    border-radius: var(--border-radius);
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
        border-radius: var(--border-radius);
        padding: 2vw;
        width: 500px;
        background-color: white;
    }
    p, button{
        margin-top: 1vw;
    }
    button{
        color: var(--primary-colour);
        background-color: rgba(255, 255, 255, 0.0);
        text-decoration: none;
        font-size: var(--paragraph-font-size);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: .2vw;
        margin-right: 1vw;
    }

`;
export default Modal;