import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getValue } from "@mui/system";


const TagModal = ({show, modal, onClose}) => {
    const {currentUser, addTag} = useContext(UserContext);
    const [tags, setTags] = useState();
    const [friendsTags, setFriendsTags] = useState();
    const [showInput, setShowInput] = useState(false);
    const [typedValue, setTypedValue] = useState("");

    useEffect(() => {
        if(currentUser){
            setTags(currentUser.tags)
        }
    }, [currentUser])

    useEffect(() => {
        if(tags){
            console.log(tags)
        }
    }, [tags])

    const getValue = (event) => {
        setTypedValue(event.target.value);
    }

    return show?(
        <Wrapper>
            <div className="modalContent">
                <p>{modal.name}</p>
                {!showInput?(
                    <button onClick={() => setShowInput(true)}>+ create tag</button>
                ):(
                    <span>
                        <input value={typedValue} onChange={getValue}/> 
                        <button disabled={typedValue.length<3} onClick={() => {
                            addTag({tag:typedValue, friendId:modal._id})
                            setShowInput(false)
                            setTypedValue("")
                        }}> add tag </button> <button onClick={() => {
                            setShowInput(false)
                            setTypedValue("")}}> cancel </button>
                    </span>
                    
                )}
                <div>
                    <button onClick={() => onClose()}>Close</button>
                </div>
                
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
`;

export default TagModal;