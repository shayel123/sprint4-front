import React, { useEffect, useRef, useState } from "react";
import createSvg from '/src/assets/icons/create.svg'
import { uploadService } from "../services/upload.service";
import { systemReducer, LOADING_DONE, LOADING_START } from "../store/system.reducer";
import { useDispatch, useSelector } from "react-redux";

export function CreatePostModal({ onCloseModal, onAddPost }) {
    const dispath = useDispatch()
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [selectedFile, setSelectedFile] = useState(null);
    const [postTitle, setPostTitle] = useState('')
    function handleInput(ev) {
        console.log(ev.target.value)
        setPostTitle(ev.target.value)
    }
    async function handleAddPhoto(ev) {
        try {
            dispath({
                type: LOADING_START
            })
            const file = await uploadService.uploadImg(ev)
            setSelectedFile(file.secure_url)
            dispath({
                type: LOADING_DONE
            })
        } catch (error) {
            console.log(error)
        }
    };

    if (isLoading) {
        return (
            <Loader />

        )
    }
    else if (selectedFile) {
        return (
            <section className="modal-img">
                <div >
                    <button onClick={() => setSelectedFile(null)} >another</button>
                    <button onClick={() => onAddPost(postTitle, selectedFile)}>Share</button>

                </div>
                <div style={{ display: 'flex' }}>

                    <img style={{ width: '70%', objectFit: 'fill' }} src={selectedFile} alt="Uploaded" />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '15px' }}>
                            <img style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%'
                            }} src='./src/assets/img/posts/post2.jpg' alt="profile" />
                            <strong className="userName-preview">userName</strong>
                        </div>
                        <input onChange={(ev) => handleInput(ev)} value={postTitle} type="text" placeholder="Write a caption..." style={{ border: 'none', margin: '15px', }} />
                    </div>
                    <button onClick={onCloseModal} className="close-modal">X</button>
                </div>


            </section>
        )

    } else return (
        <section className="modal">
            <div className="modal-header">
                <h4>Create new post</h4>
            </div>
            <div className="add-files">
                <img style={{ width: '33%', margin: '5px auto' }} src={createSvg} alt="" />
                <input onChange={handleAddPhoto} type="file" />
                <button onClick={onCloseModal} className="close-modal">X</button>
            </div>
        </section>
    )
}

function Loader() {
    return (
        <section className="modal">
            <div >
                <h2>Uploading photo...</h2>
            </div>

        </section>
    )
}

