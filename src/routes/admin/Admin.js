import React, { useState } from 'react'
import './Admin.css'
import axios from '../../api'

function Admin() {

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const objectURL = URL.createObjectURL(selectedFile);
    setImgUrl(objectURL);
    setImg(e.target.files[0])
  };


  function handleSubmit(e) {
    e.preventDefault()
    // let data = new FormData()
    // data.append("img", img)
    axios.post("/products", {title, price, type, desc, img})
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // console.log(img);
  }
  

  return (
    <div className='admin__wrapper'>
        <h1>Welcome Boss,</h1>
      <div className="create__product">
        <form action="" onSubmit={handleSubmit}>
          <h3>Mahsulot Yaratish Uchun Quyidagilarni To'ldiring</h3>
          <div className="create__input">
            <input required type="text" placeholder='Mahsulot Nomi' value={title} onChange={e => setTitle(e.target.value)}/>
          </div>
          <div className="create__input">
            <input required type="text" placeholder='Mahsulot Narxi' value={price} onChange={e => setPrice(e.target.value)}/>
          </div>
          <div className="create__input">
            <select required name="" id="" value={type} onChange={e => setType(e.target.value)}>
              <option value="" disabled>Mahsulot Turi</option>
              <option value="lavash">Lavash</option>
              <option value="Pitsalar">Pitsalar</option>
              <option value="Gamburger">Gamburger</option>
              <option value="Hot Dog">Hot Dog</option>
              <option value="Klab Sendvich">Klab Sendvich</option>
              <option value="Qarsildoq Jo'jalar">Qarsildoq Jo'jalar</option>
              <option value="Salatlar">Salatlar</option>
              <option value="Shirinliklar">Shirinliklar</option>
              <option value="Souslar">Souslar</option>
            </select>
          </div>
          <div className="create__input">
            <textarea required value={desc} onChange={e => setDesc(e.target.value)}placeholder='Mahsulot Tarkibi'></textarea>
          </div>
          <div className="create__input">
            <label htmlFor="file">Choose a Photo</label>
            <input required onChange={handleFileChange} type="file" id='file' accept='image/*'/>
          </div>
          <button className='submit__btn'>Yaratish</button>
        </form>
        <div className="preview__container">
          {imgUrl && <h3>Mahsulotning Rasmi</h3>}
          <div className="preview__card">
            {imgUrl && <img src={imgUrl} alt="" />}
          </div>
        </div>
      </div>
      <div className="products__container">sef</div>
    </div>
  )
}

export default Admin