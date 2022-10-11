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
                <p>{modal.name}</p>
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
                    <button onClick={() => setShowInput(true)}>+ create tag</button>
                ):(
                    <div>
                        <input value={typedValue} onChange={getValue}/> 
                        <button disabled={typedValue.length<3} onClick={() => {
                            updateTag({tag:typedValue, friendId:modal._id, change:"add tag"})
                            setShowInput(false)
                            setTypedValue("")
                        }}> add tag </button> <button onClick={() => {
                            setShowInput(false)
                            setTypedValue("")}}> cancel </button>
                    </div>
                    
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