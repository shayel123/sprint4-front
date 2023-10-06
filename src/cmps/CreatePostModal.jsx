import React, { useRef, useState } from "react";
import createModalSvg from '/src/assets/icons/create-modal.svg'
import backSvg from '/src/assets/icons/back.svg'
import { uploadService } from "../services/upload.service";
import { systemReducer, LOADING_DONE, LOADING_START } from "../store/system.reducer";
import { useDispatch, useSelector } from "react-redux";

export function CreatePostModal({ onCloseModal, onAddPost }) {
    const dispath = useDispatch()
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [selectedFile, setSelectedFile] = useState(null);


    async function handleAddPhoto(ev) {
        dispath({
            type: LOADING_START
        })
        try {
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
            <section className="modal">
                <div className="modal-header">
                    <h4>Create new post</h4>
                    <hr />
                </div>
                <div class="loader-line"></div>
            </section>
        )
    }
    if (selectedFile) {

        return (
            <section className="modal-edit">
                <div className="modal-header-share" >
                    <button className="btn-back" onClick={() => setSelectedFile(null)} ><img src={backSvg} alt="back" /></button>
                    <p><strong>Create new post</strong></p>
                    <button className="btn-share" onClick={() => onAddPost('this should be input', selectedFile)}>Share</button>
                </div>
                <div className="modal-edit-area">
                <img style={{ width: '100%', objectFit: 'fill', height: '100%' }} src={selectedFile} alt="Uploaded" />
                <textarea rows="2" cols="50" placeholder="Write a caption..."></textarea>
                </div>
                <button onClick={onCloseModal} className="close-modal">X</button>
            </section>
        )
    } else return (
        <section className="modal">
            <div className="modal-header">
                <h4>Create new post</h4>
                <hr />
            </div>
            <div className="add-files">
                <img style={{ width: '150px', margin: '5px auto' }} src={createModalSvg} alt="" />
                <label htmlFor="btn-upload" className="label-upload">Select from computer</label>
                <input id="btn-upload" className="btn-upload" onChange={handleAddPhoto} type="file" />
                <button onClick={onCloseModal} className="close-modal">X</button>
            </div>
        </section>
    )
}