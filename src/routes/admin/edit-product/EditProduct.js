import React, { useEffect, useState } from 'react'
import './EditProduct.css'
import axios from '../../../api'
import { useDispatch, useSelector } from 'react-redux'
import { reloadData } from '../../../context/reloadData'


function EditProduct({ editData, setEditData }) {


    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState(null)

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const reloadSlice = useSelector(s => s.reloadData.value)


    const dispatch = useDispatch()

    useEffect(() => {
        if (editData) {
            setTitle(editData?.title)
            setPrice(editData?.price)
            setDesc(editData?.desc)
        }
    }, [editData])
    const selecetedValue = categories?.find(c => c._id === editData?.cType._id)

    const sortedArr = useEffect(() => {
        categories?.sort((a, b) => {
            if (a._id === editData?.cType._id) {
                return -1;
            }
            if (b._id === editData?.cType._id) {
                return 1;
            }
            return 0;
        });
    }, [editData, reloadSlice])


    useEffect(() => {
        axios.get("/products/categories")
            .then(res => {
                setCategories(res.data.innerData)
            })
            .catch(err => {
                alert(err.response.data.msg)
                console.log(err)
            })
    }, [reloadSlice, editData])

    const handleUpdateProduct = (e) => {
        e.preventDefault()
        setLoading(true)
        const newData = { title, price, desc, type: JSON.stringify(type) }
        axios.put(`/products/update/${editData._id}`, newData)
            .then(res => {
                console.log(res)
                setEditData(null)
                dispatch(reloadData())
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }


    console.log(sortedArr);


    const handleGetType = (e) => {
        const selectedOption = categories?.find((category) => category.categoryName === e.target.value);
        setType(selectedOption)
    }

    return (
        <>
            {
                editData && <div onClick={() => setEditData(null)} className="edit__shadow"></div>
            }
            <div className={`edit__wrapper ${editData ? "show" : ""}`}>
                <form action="" className='edit__form' onSubmit={handleUpdateProduct}>
                    <h3 className='edit__pro__title'>Mahsulotni Tahrirlash</h3>
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
                                <option value="" disabled >Mahsulot turi</option>
                                {
                                    categories?.map((i, id) => <option key={id} value={i.categoryName}> {i.categoryName} </option>)
                                }
                            </select>
                        </div>
                        <div className="create__input textarea">
                            <textarea required value={desc} onChange={e => setDesc(e.target.value)} placeholder='Mahsulot Tarkibi'></textarea>
                        </div>
                    </article>

                    <button className='edit__submit__btn'>Yangilash</button>
                </form>
            </div>
        </>
    )
}

export default EditProduct