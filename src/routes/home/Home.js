import React, { useEffect, useMemo, useState } from 'react'
import './Home.css'
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai'
import SingleProduct from '../../components/single-product/SingleProduct'
import loaderGif from '../../assets/pizza-gif-loader.gif'
import axios from '../../api'
import menu__img from '../../assets/menu-img.png'
import { useDispatch, useSelector } from 'react-redux'
import cart, { addToCart, decFromCart } from '../../context/cart'

function Home() {

  const cartItems = useSelector(c => c.cart.cartItems)

  const [data, setData] = useState([])
  const [category, setCategory] = useState("Lavash")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [singleData, setSingleData] = useState(null)

  document.body.style.overflow = singleData ? "hidden" : "auto"

  useEffect(() => {
    setLoading(true)
    axios.get("/products")
      .then(res => {
        setData(res.data.innerData)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])


  const filterData = (data) => {
    return data.filter(i => i.cType.categoryName === category)
  }

  const memoContent = useMemo(() => {
    return filterData(data)
  }, [category, data])

  // const menuItemsMemo = useMemo(() => {
  //   let categories = []
  //   for (let i of data) {
  //     if (!categories.includes(i.cType.categoryName)) {
  //       categories.push(i.cType)
  //     }
  //   }
  //   return categories
  // }, [data])

  const menuItemsMemo = useMemo(() => {
    let categories = []
    data.forEach(i => {
      if (!categories.some(c => c.categoryName === i.cType.categoryName)) {
        categories.push(i.cType)
      }
    })
    return categories
  }, [data])

  return (
    <React.Fragment>
      {
        loading
          ?
          <div className='loading__home__container container'>
            <img width={300} src={loaderGif} alt="" />
          </div>
          :
          <div className='home__wrapper'>
            <h1 style={{ textAlign: 'center' }}>Menu</h1>
            <div className="home__container container">
              <div className="menu__sidebar">
                <div className="menu__title">
                  <h1 className='menu__title'><AiOutlineMenu /> Katalog</h1>
                </div>
                <div className="menu__items">
                  {
                    menuItemsMemo && menuItemsMemo?.map((i, id) => <div
                      className={`menu__item ${category === i.categoryName ? "active" : ""}`}
                      onClick={() => setCategory(i.categoryName)}
                      key={id}> <img className='menu__img' width={40} src={i.categoryImg} alt="" /> {i.categoryName}</div>)
                  }
                </div>
              </div>
              <div className="menu__content">
                <h1>{category}</h1>
                <div className="products">
                  {
                    memoContent && memoContent?.map((i, id) => <div key={i._id} className='product__card'>
                      <img src={i.url} alt="" onClick={() => setSingleData(i)} />
                      <h3>{i.title}</h3>
                      <p><p style={{ color: '#E52D2B' }}> {i.price} </p> so'm</p>
                      <div className='add__to__cart' >

                        {cartItems?.find(e => e._id === i._id) ? (
                          <div className="inc__cart">
                            <button onClick={() => dispatch(decFromCart(i))}>-</button>
                            <p>{cartItems?.find((item) => item._id === i._id).cartQuantity}</p>
                            <button onClick={() => dispatch(addToCart(i))}>+</button>
                          </div>
                        ) : (
                          <div className='add__cart' onClick={() => dispatch(addToCart(i))}>Qo'shish</div>
                        )}
                      </div>
                      <AiOutlineHeart />
                    </div>)
                  }
                </div>
              </div>
            </div>
          </div>
      }
      <SingleProduct singleData={singleData} setSingleData={setSingleData} />
    </React.Fragment>
  )
}

export default Home