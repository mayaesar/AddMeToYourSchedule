import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const TagModal = ({show, modal, onClose}) => {
    const {currentUser, updateTag} = useContext(UserContext);
    const [tags, setTags] = useState();
    const [friendsTags, setFriendsTags] = useState();
    const [otherTags, setOtherTags] = useState();
    const [showInput, setShowInput] = useState(false);
    const [typedValue, setTypedValue] = useState("");

    useEffect(() => {
        if(currentUser){
            console.log(currentUser.tags)
            setTags(currentUser.tags)
        }
    }, [currentUser])

    useEffect(() => {
        if(tags){
            const arr = [];
            let isArr = false;
            const otherArr = [];
            let isOtherArr = false;
            tags.map(tag => {
                if(tag.friendId == modal._id){
                    isArr = true;
                    const element = <button onClick={() => updateTag({tag:tag.tag, friendId:modal._id, change:"remove friend of tag"})}>
                        - {tag.tag}
                    </button>
                    arr.push(element)
                }
                else{
                    isOtherArr = true;
                    const element = <button onClick={() => updateTag({tag:tag.tag, friendId:modal._id, change:"add friend to tag"})}>
                        + {tag.tag}
                    </button>
                    otherArr.push(element)
                }
            })
            if(isArr){
                setFriendsTags(arr);
            }
            if(isOtherArr){
                setOtherTags(otherArr);
            }
            
        }
    }, [tags])

    const getValue = (event) => {
        setTypedValue(event.target.value);
    }
    console.log(friendsTags)
    return show?(
        <Wrapper>
            <div className="modalContent">
                <div className="close">
                    <button onClick={() => onClose()}>X</button>
                </div>
                <h2>{modal.name}</h2>
                <p>Friend's tags:</p>
                {friendsTags?(
                    friendsTags.map(tag => {
                        return tag;
                    })
                ):(
                    null
                )}
                <p>Other tags:</p>
                {otherTags?(
                    otherTags.map(tag => {
                        return tag;
                    })
                ):(
                    null
                )}
                {!showInput?(
                    <button onClick={() => setShowInput(true)}>+ Create tag</button>
                ):(
                    <div>
                        <input value={typedValue} onChange={getValue}/> 
                        <button disabled={typedValue.length<3} onClick={() => {
                            updateTag({tag:typedValue, friendId:modal._id, change:"add tag"})
                            setShowInput(false)
                            setTypedValue("")
                        }}> Add tag </button> <button onClick={() => {
                            setShowInput(false)
                            setTypedValue("")}}> Cancel </button>
                    </div>
                    
                )}
            </div>
        </Wrapper>
    ):(
        null
    )
}

const Wrapper = styled.div`
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
    .close{
        position: relative;
        z-index: 1;
        left: 48vh;
        bottom: 1.5vw;
    }
    input{
        font-size: 1.2vw;
        padding: .2vw;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        width: 10vw;
        padding-left: 1vw;
        font-size: var(--subheader-font-size);
        border-radius: var(--border-radius);
        border: var(--border);
    }

`;

export default TagModal;