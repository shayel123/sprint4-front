import React,{ useRef,useState } from "react";
import createSvg from '/src/assets/icons/create.svg'


export function CreatePostModal({ onCloseModal }) {
    const fileInputRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    function handleAddPhoto() {
        const file = fileInputRef.current.files[0];
        console.log(file)
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
        // const formData = new FormData();
        // formData.append('image',file)
        // console.log(formData)
    };
    if (selectedFile) {
        console.log(selectedFile)
        return (
            <section className="modal">
                <div >
                    <button onClick={() => setSelectedFile(null)} >another</button>
                    <button>Share</button>

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
                <input ref={fileInputRef} onChange={handleAddPhoto} type="file" />
                <button onClick={onCloseModal} className="close-modal">X</button>
            </div>
        </section>
    )
}