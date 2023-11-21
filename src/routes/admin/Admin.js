import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './Admin.css'
import axios from '../../api'
import AdminHeader from '../../components/sidebar/AdminHeader'
import CreateProduct from './create-product/CreateProduct'
import ManageProduct from './products-list/ManageProduct'
import CreateRegion from './manage-regions/CreateRegion'

function Admin() {

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState([])

  const [getData, setGetData] = useState([])
  const [imgUrl, setImgUrl] = useState('')

  const [reloaData, setReloadData] = useState(false)

  useEffect(() => {
    axios.get("/products")
      .then(res => setGetData(res.data.innerData))
      .catch(err => console.log(err))
  }, [reloaData])


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const objectURL = URL.createObjectURL(selectedFile);
    setImgUrl(objectURL);
    setImg(e.target.files[0])
  };

  function handleSubmit(e) {
    e.preventDefault()
    let data = new FormData()
    data.append("title", title)
    data.append("price", Number(price))
    data.append("type", type)
    data.append("desc", desc)
    data.append("img", img)

    axios.post("/products", data)
      .then(res => setReloadData(p => !p))
      .catch(err => console.log(err))
  }


  function handleDeletePro(id) {
    axios.delete(`/products/${id}`)
      .then(res => setReloadData(p => !p))
      .catch(err => console.log(err))
  }


  return (
    <div className='admin__wrapper'>

      <AdminHeader />
      <Routes>
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/manage-product' element={<ManageProduct/>}/>
        <Route path='/create-region' element={<CreateRegion/>}/>
      </Routes>

      <div className="create__product">
        <form action="" onSubmit={handleSubmit}>
          <h3>Mahsulot Yaratish Uchun Quyidagilarni To'ldiring</h3>
          <div className="create__input">
            <input required type="text" placeholder='Mahsulot Nomi' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="create__input">
            <input required type="number" placeholder='Mahsulot Narxi' value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className="create__input">
            <select required name="" id="" value={type} onChange={e => setType(e.target.value)}>
              <option value="" disabled>Mahsulot Turi</option>
              <option value="Lavash">Lavash</option>
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
            <textarea required value={desc} onChange={e => setDesc(e.target.value)} placeholder='Mahsulot Tarkibi'></textarea>
          </div>
          <div className="create__input">
            <label htmlFor="file">Choose a Photo</label>
            <input required onChange={handleFileChange} type="file" id='file' accept='image/*' />
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

      {/* <div className="products__container">
        <table className='disabltabl'>
          <thead>
            <th>Mahsulot Nomi</th>
            <th>Mahsulot Narxi</th>
            <th>Mahsulot Haqida</th>
            <th>Mahsulot Turi</th>
            <th>Mahsulot Rasmi</th>
            <th>Mahsulotni Tahrirlash</th>
            <th>Mahsulotni O'chirish</th>
          </thead>
          <tbody className='table__body'>
            {
              [...getData].reverse().map(i => <tr key={i._id} className="table__body__row">
                <td>{i.title}</td>
                <td>{i.price}</td>
                <td>{i.desc.slice(0, 20)}</td>
                <td>{i.type}</td>
                <td><Link className='pro__img__link' to={i.url}>Rasmni Ko'rish</Link></td>
                <td><button className='pro__edit__btn'>Tahrirlash</button></td>
                <td><button onClick={() => handleDeletePro(i._id)} className='pro__del__btn'>O'chirish</button></td>
              </tr>)
            }
          </tbody>
        </table>
      </div> */}

    </div>
  )
}

export default Admin