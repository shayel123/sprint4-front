import React, { useRef, useState } from "react";
import createSvg from '/src/assets/icons/create.svg'
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
                <div >
                    <h2>Uploading photo...</h2>
                </div>

            </section>
        )
    }
    if (selectedFile) {

        return (
            <section className="modal">
                <div >
                    <button onClick={() => setSelectedFile(null)} >another</button>
                    <button onClick={() => onAddPost('this shuld be input', selectedFile)}>Share</button>

                </div>
                <img style={{ width: '100%', objectFit: 'fill', height: '100%' }} src={selectedFile} alt="Uploaded" />
                <button onClick={onCloseModal} className="close-modal">X</button>

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