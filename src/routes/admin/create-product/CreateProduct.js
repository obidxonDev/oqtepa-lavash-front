import React, { lazy, useEffect, useRef, useState } from 'react'
import './CreateProduct.css'
import axios from '../../../api'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { reloadData } from '../../../context/reloadData'
import { toast } from 'react-toastify'


function CreateProduct() {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryImgName, setCategoryImgName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [type, setType] = useState(null)
  const [img, setImg] = useState([])
  const [loading, setLoading] = useState(false)
  const [categoryImg, setCategoryImg] = useState([])
  const [categories, setCategories] = useState([])
  const reloadSlice = useSelector(s => s.reloadData.value)

  useEffect(() => {
     if (!type) {
      setType(categories[0]);
    }
  }, [categories])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setImgUrl(selectedFile && selectedFile.name)
    setImg(selectedFile && e.target.files[0])
  };

  const handleGetCategoryImg = (e) => {
    const file = e.target.files[0]
    setCategoryImg(file && e.target.files[0])
    setCategoryImgName(file && file.name)
  }

  const handleGetType = (e) => {
    const selectedOption = categories.find((category) => category.categoryName === e.target.value);
    setType(selectedOption)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    let data = new FormData()
    data.append("title", title)
    data.append("price", Number(price))
    data.append("type", JSON.stringify(type))
    data.append("desc", desc)
    data.append("img", img)

    axios.post("/products", data)
      .then(res => {
        console.log(res)
        setTitle("")
        setPrice("")
        setDesc("")
        setImg([])
        setImgUrl("")
        dispatch(reloadData())
        toast.success(res.data.msg)
      })
      .catch(err => {
        alert(err.response.data.msg)
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    axios.get("/products/categories")
      .then(res => {
        setCategories(res.data.innerData)
      })
      .catch(err => {
        alert(err.response.data.msg)
        console.log(err)
      })
  }, [ reloadSlice ])

  function handleCreateCategory(e) {
    e.preventDefault()
    setLoading(true)

    let cData = new FormData()
    cData.append("categoryName", categoryName)
    cData.append("categoryImg", categoryImg)

    axios.post("/products/categories", cData)
      .then(res => {
        dispatch(reloadData())
        setCategoryName("")
        setCategoryImg([])
        setCategoryImgName('')
        toast.success(res.data.msg)
      })
      .catch(err => {
        // alert(err.response.data.msg)
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  function handleDeleteCategory(id) {
    setLoading(true)
    axios.delete(`/products/categories/${id}`)
      .then(res => {
        dispatch(reloadData())
        toast.warning(res.data.msg)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  return (
    <div className={`create-product-wrapper`}>
      <div style={loading ? { display: 'inline-block' } : { display: 'none' }} className="lds-dual-ring"></div>
      <div className="create__banner">
        <form action="" onSubmit={handleSubmit}>
          <h3 className='create__pro__title'>Mahsulot Yaratish Uchun Quyidagilarni To'ldiring</h3>
          <article>
            <div className="create__input">
              <input required type="text" placeholder='Mahsulot Nomi' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="create__input">
              <input required type="number" placeholder='Mahsulot Narxi' value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </article>

          <article>
            <div className="create__input">
              <select required name="" id="" onChange={handleGetType}>
                {
                  categories?.map(i => <option value={i.categoryName}> {i.categoryName} </option>)
                }
              </select>
            </div>
            <div className="create__input textarea">
              <textarea required value={desc} onChange={e => setDesc(e.target.value)} placeholder='Mahsulot Tarkibi'></textarea>
            </div>
          </article>

          <article>
            <div className="create__in">
              <label htmlFor="file">Choose a Photo</label>
              <input required onChange={handleFileChange} type="file" id='file' accept='image/*' />
            </div>
            <p className='file__name'>{imgUrl ? imgUrl : "No file Choosen"}</p>
          </article>

          <button className='submit__btn'>Yaratish</button>
        </form>
      </div>
      <div className="preview__container">
        <h3 className='preview__title'>Mahsulotlar Turlari</h3>
        <form action='' className="create__category__box" onSubmit={handleCreateCategory}>
          <input required className='category__name__input' type="text" placeholder='New Category' value={categoryName} onChange={e => setCategoryName(e.target.value)} />
          <button className='category__btn' disabled={loading}> {loading ? "Creating..." : "Create"} </button>
          <label htmlFor="cFile" > {categoryImgName ? categoryImgName : "Choose an Image For Category"} </label>
          <input className='category__img__input' id='cFile' type="file" onChange={handleGetCategoryImg} accept='image/*' />
        </form>

        <div className="all__categories">
          {
            categories?.map(i => (<>
              <p key={i._id}>
                <div>
                  <img src={i.categoryImg} alt="" />
                  {i.categoryName}
                </div>
                <button onClick={() => handleDeleteCategory(i._id)}> <BsFillTrash3Fill /> </button>
              </p>
            </>))
          }
        </div>
      </div>
    </div>
  )
}

export default CreateProduct