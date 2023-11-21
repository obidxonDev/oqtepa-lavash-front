import React, { useEffect, useState } from 'react'
import './EditImage.css'

function EditImage({ editImg, setEditImg }) {

    const [imgUrl, setImgUrl] = useState('')
    const [img, setImg] = useState([])

    useEffect(() => {
        if (editImg) {
            setImg(editImg.img)
            setImgUrl(editImg.imgUrl)
        }
    }, [editImg])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setImgUrl(selectedFile && selectedFile.name)
        setImg(selectedFile && e.target.files[0])
    };

    return (
        <>
            {
                editImg && <div onClick={() => setEditImg(null)} className="edit__img__shadow"></div>
            }
            <div className={`edit__img__wrapper ${editImg ? "show" : ""}`}>
                <img src={editImg} alt="" className="edit__img__img" />
                <form action="" className='edit__img__form'>
                    <div className="edit__img">
                        <label htmlFor="edit__file">Choose New Photo</label>
                        <input required onChange={handleFileChange} type="file" id='edit__file' accept='image/*' />
                    </div>
                    <p className='edit__file__name'>{imgUrl ? imgUrl : "No file Choosen"}</p>

                    <button className='edit__submit__btn'>Yangilash</button>
                </form>
            </div>
        </>
    )
}

export default EditImage