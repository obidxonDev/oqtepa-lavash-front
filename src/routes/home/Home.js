import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import axios from '../../api'
import './Home.css'

function Home() {

  const [data, setData] = useState([])
  const [category, setCategory] = useState("lavash")

  useEffect(() => {
    axios.get("/products")
      .then(res =>{
        // console.log(res)
        setData(res.data.innerData)
      }) 
      .catch(err => console.log(err))    
  }, [])


  const filterData = (data) => {
    return data?.filter(i => i.type === category)
  }

  const memoCategory = useMemo(() => {
    return filterData(data)
  }, [category])

  console.log(memoCategory);

  return (
    <div className='home__wrapper'>
      <h1 style={{textAlign: 'center'}}>Menu</h1>
      <div className="home__container container">
        <div className="menu__sidebar">
          <div className="menu__title">
            <h1><AiOutlineMenu/> Katalog</h1>
          </div>
          <div className="menu__items">
            {
              
            }
          </div>
        </div>
        <div className="menu__content">
          {
            memoCategory?.map(i => <div key={i._id} className='product__card'>
              <img src={i.url} alt="" />
              <h1>{i.title}</h1>
              <p>{i.price}</p>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Home