import React, { useEffect, useMemo, useState } from 'react'
import './ManageProduct.css'
import axios from '../../../api'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reloadData } from '../../../context/reloadData'
import EditProduct from '../edit-product/EditProduct'
import { FcEditImage } from 'react-icons/fc'
import { AiFillEye } from 'react-icons/ai'
import EditImage from '../edit-product-image/EditImage'

function ProductList() {
  const reloadSlice = useSelector(s => s.reloadData.value)

  const [getData, setGetData] = useState([])
  const [loading, setLoading] = useState(false)
  const [productIds, setProductIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [allCategories, setAllCategories] = useState([])
  const [category, setCategory] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchLoader, setSearchLoader] = useState(true)
  const [editData, setEditData] = useState(null)
  const [editImg, setEditImg] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setSearchLoader(true)
    axios.get("/products/manage-products", {
      params: { category }
    })
      .then(res => {
        setGetData(res.data.innerData)
      })
      .catch(err => console.log(err))
      .finally(() => setSearchLoader(false))
  }, [reloadSlice, category])

  useEffect(() => {
    axios.get("/products/cTypeObjects")
      .then(res => setAllCategories(res.data.innerData))
      .catch(err => console.log(err))
  }, [category, getData, reloadSlice])


  useEffect(() => {
    setSearchLoader(true)
    axios.get(`/products/search?searchText=${searchText}`)
      .then(res => setGetData(res.data.innerData))
      .catch(err => console.log(err))
      .finally(() => setSearchLoader(false))
  }, [searchText])




  // const filteredMemo = useMemo(() => {
  //   let categorys = []
  //   // for(let i of getData){
  //     if(!allCategories.includes(i.cType.categoryName)){
  //       categorys.push(i.cType.categoryName)
  //     // }
  //   }
  //   return categorys
  // }, [getData, category])

  const handleDeleteProduct = (id) => {
    setLoading(true)
    axios.delete(`/products/${id}`)
      .then(res => {
        dispatch(reloadData())
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const handleGetIds = (id) => {
    const isInArray = productIds.includes(id)
    if (isInArray) {
      setProductIds(productIds.filter(i => i !== id))
    } else {
      setProductIds([...productIds, id])
    }
  }

  const handleGetAllIds = () => {
    if (selectAll) {
      setProductIds([])
    } else {
      const allIds = getData.map(i => i._id)
      setProductIds(allIds)
    }
    setSelectAll(!selectAll)
  }

  useEffect(() => {
    const allRowsChecked = getData.every((i) => productIds.includes(i._id));
    setSelectAll(allRowsChecked);
  }, [productIds, getData]);

  const handleDeleteAll = () => {
    setLoading(true)
    axios.post("/products/delete-multiple", { productIds })
      .then(res => {
        dispatch(reloadData())
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  return (
    <div className='manage__product__wrapper'>
      <div style={loading ? { display: 'inline-block' } : { display: 'none' }} className="lds-dual-ring"></div>
      <div className="manage__box">
        <div className="manage__header">
          <article>
            <button disabled={productIds.length === 0} onClick={() => handleDeleteAll()} className='del__seleceted__btn'>Delete Selected</button>
          </article>
          <article className='sel__all'>
            <label htmlFor="all">Select All</label>
            <input checked={selectAll} onChange={handleGetAllIds} type="checkbox" id='all' />
          </article>
          <article>
            <select className='manage__select' value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Hammasi</option>
              {
                allCategories?.map((i, id) => <option key={id} value={i.categoryName}>
                  {i.categoryName}
                </option>)
              }
            </select>
          </article>
          <article className='manage__search'>
            <input type="text" placeholder='Search Products' value={searchText} onChange={e => setSearchText(e.target.value)} />
          </article>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Tanlash</th>
              <th>Mahsulot Nomi</th>
              <th>Mahsulot Narxi</th>
              <th>Mahsulot Haqida</th>
              <th>Mahsulot Turi</th>
              <th>Mahsulot Rasmi</th>
              <th>Tahrirlash</th>
              <th>O'chirish</th>
            </tr>
          </thead>
          <tbody className='tbody'>
            <span style={searchLoader ? { display: 'inline-block' } : { display: 'none' }} className="searchLoader"></span>
            {
              [...getData].reverse().map(i => <tr key={i._id} className="table__row">
                <td><input type="checkbox" checked={productIds.includes(i._id)} onChange={() => handleGetIds(i._id)} className='manage__checkbox' /></td>
                <td>{i.title}</td>
                <td>{i.price}</td>
                <td>{i.desc.slice(0, 20)}</td>
                <td>{i.cType.categoryName}</td>
                <td><Link to={i.url}><AiFillEye className='manage__img__see__icon'/></Link> <FcEditImage onClick={() => setEditImg(i.url)} className='manage__edit__img__icon'/></td>
                <td><button onClick={() => setEditData(i)} className='manage__edit__btn'>Tahrirlash</button></td>
                <td><button onClick={() => handleDeleteProduct(i._id)} className='manage__del__btn'>O'chirish</button></td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      <EditProduct editData={editData} setEditData={setEditData} />
      <EditImage editImg={editImg} setEditImg={setEditImg}/>
    </div>
  )
}

export default ProductList