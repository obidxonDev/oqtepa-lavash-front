import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { viloyatlar } from '../../static/static'
import './Navbar.css'
import { MdLocationPin, MdMenuBook, MdShoppingCart } from 'react-icons/md'
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { GiEarthAmerica } from 'react-icons/gi'
import usaFlag from '../../assets/usaflag.png'
import uzbFlag from '../../assets/uzbekistanflag.png'
import rusFlag from '../../assets/russiaflag.png'
import ReactSelect from 'react-select'
import { reloadBranches } from '../../context/updateBranch'


function Navbar() {

   const countries = [
      { value: 'uz', label: "UZ", image: uzbFlag },
      { value: 'en', label: 'EN', image: usaFlag },
      { value: 'ru', label: 'RU', image: rusFlag }
   ];

   const dispatch = useDispatch()
   const [region, setRegion] = useState(false)
   const [userRegion, setUserRegion] = useState(null)
   const [deliveryActive, setDeliveryActive] = useState(false)
   const [delivery, setDelivery] = useState(true)

   const [searchValue, setSearchValue] = useState('')
   const [branchData, setBranchData] = useState(null)
   const [branchId, setBranchId] = useState(null)
   const regions = JSON.parse(localStorage.getItem("user-region"))
   const path = useLocation()

   useEffect(() => {
      const savedRegion = localStorage.getItem("user-region")
      if (savedRegion) {
         setUserRegion(JSON.parse(savedRegion))
      } else {
         setRegion(true)
      }
   }, [])

   function handleSetRegion(user) {
      setUserRegion(user)
      localStorage.setItem("user-region", JSON.stringify(user))
      setRegion(false)
      dispatch(reloadBranches())
   }

   function handleSetDelivery() {
      setDeliveryActive(true)
   }

   if (path.pathname.includes("/login") || path.pathname.includes("/admin")) {
      return <></>
   }

   document.body.style.overflow = deliveryActive ? "hidden" : "auto"
   const searchData = regions?.branches?.branch.filter(i => i.toLowerCase().includes(searchValue.toLowerCase()))

   return (
      <React.Fragment>
         <div className='navbar__wrapper container'>
            <Link to={"/"} className="navbar__logo">
               <img src="https://oqtepalavash.uz/assets/images/logo_wide_screen.png" alt="" />
            </Link>
            <div className="navbar__items">
               <div className="nav__items">
                  <div className="nav__links">
                     <ul>
                        <li><Link to={"/"}>Menyu</Link></li>
                        <li><Link to={"/about"}>Biz Haqimizda</Link></li>
                        <li><Link to={"/branches"}>Filiallar</Link></li>
                        <li><Link to={"/contact"}>Kontaktlar</Link></li>
                     </ul>
                  </div>
                  <MdLocationPin className='delivery__icon' onClick={() => setDeliveryActive(true)} />
                  <span className='delivery__text' onClick={() => handleSetDelivery()}>
                     <p className='navbar__text'>{branchData ? branchData : "Yetkazib Berish yoki"}</p>
                     <p>{"Olib Ketish"}</p>
                  </span>
                  <GiEarthAmerica onClick={() => setRegion(true)} />
                  <span className='location__text' onClick={() => setRegion(true)}>
                     <p className='navbar__text'>Hudud</p>
                     <p>{userRegion && userRegion.loc}</p>
                  </span>
                  <ReactSelect
                     value={countries.value}
                     className="lang__selection__media"
                     options={countries}
                     formatOptionLabel={country => (
                        <div className="country-option">
                           <img width={20} src={country.image} alt="country-image" />
                           <span>{country.label}</span>
                        </div>
                     )}
                  />
               </div>
               <div className="search">
                  <div className="search__input">
                     <BsSearch />
                     <input type="text" placeholder='Pishloqli Tandir Lavash' />
                  </div>
               </div>
            </div>
            <div className="navbar__login__box">
               <div className="login__box__top">
                  <div className="lang__selection">
                     <ReactSelect
                        value={countries.value}
                        options={countries}
                        formatOptionLabel={country => (
                           <div className="country-option">
                              <img width={20} src={country.image} alt="country-image" />
                              <span>{country.label}</span>
                           </div>
                        )}
                     />
                  </div>
                  <Link className="login">Kirish</Link>
               </div>
               <div className="link__to__cart">
                  <Link to={"/cart"} className='link__cart'>Savatcha</Link>
               </div>
            </div>
         </div>

         <div style={region ? { display: 'flex' } : { display: 'none' }} className="region__container">
            <div className="region__box">
               <h2>Hududingizni Tanlang</h2>
               <ul>
                  {
                     viloyatlar.map(i => <li onClick={() => handleSetRegion(i)} key={i.id} >{i.loc}</li>)
                  }
               </ul>
            </div>
         </div>

         <div className="navbar__media__div">
            <ul>
               <li><NavLink to={"/"} className="nav__active"> <MdMenuBook /> <p>Menu</p></NavLink></li>
               <li><NavLink to={"/liked"} className="nav__active"> <AiFillHeart /> <p>Sevimlilar</p></NavLink></li>
               <li><NavLink to={"/cart"} className="nav__active"> <MdShoppingCart /> <p>Savatcha</p></NavLink></li>
               <li><NavLink to={"/login"} className="nav__active"> <FaUser /> <p>Kirish</p></NavLink></li>
            </ul>
         </div>

         <div className="delivey__container" style={deliveryActive ? { display: 'flex' } : { display: 'none' }}>
            <div className="delivery__box container">
               <div className="choose__address">
                  <h2>Qabul Qilish Turini Tanlang</h2>
                  <AiOutlineClose className='delivery__close__icon1' onClick={() => setDeliveryActive(false)} />
                  <div className='delivery__item'>
                     <div onClick={() => setDelivery(true)} style={delivery ? { backgroundColor: "white", boxShadow: '0px 0px 10px #00000015' } : { backgroundColor: "transparent" }}>
                        <p>Yetkazip Berish</p>
                     </div>
                     <div onClick={() => setDelivery(false)} style={delivery ? { backgroundColor: "transparent" } : { backgroundColor: "white", boxShadow: '0px 0px 10px #00000015' }}>
                        <p>Olib Ketish</p>
                     </div>
                  </div>
                  <div className="delivey__item__box">
                     <input value={branchData ? branchData : searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder='Manzilni Kiriting' />
                     <AiOutlineClose onClick={() => { setBranchData(null); setBranchId(null); setSearchValue("") }} />
                  </div>


                  <div className="delivery__div__container" style={delivery ? { display: 'flex' } : { display: 'none' }}>

                  </div>
                  <div className="take__away__container" style={delivery ? { display: 'none' } : { display: 'flex' }}>
                     {
                        searchData?.map((i, id) =>
                           <div
                              style={id === branchId ? { border: '1px solid red' } : {}}
                              onClick={() => { setBranchId(id); setBranchData(i) }}
                              className='location__item'
                              key={id}>
                              <MdLocationPin />
                              <div className="braches__title__content">
                                 {i} <p>Restoran Yopilish Vaqti 02:40</p>
                              </div>
                           </div>)
                     }
                  </div>



                  <div className="confirm__btn">
                     <button
                        onClick={() => setDeliveryActive(false)}
                        disabled={branchData === null}
                        style={branchData === null ? { backgroundColor: '#f4f4f4' } : { backgroundColor: '#E52D2B', color: 'white' }}
                     >Tasdiqlash</button>
                  </div>
               </div>
               <div className="choose__map">
                  <AiOutlineClose className='delivery__close__icon2' onClick={() => setDeliveryActive(false)} />
                  <iframe
                     title='No One Is Perfect'
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12043.734284534381!2d71.646285116333!3d41.00482714250801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4beef2485ac1%3A0x316f055d9e451c6c!2sShodiyona!5e0!3m2!1suz!2s!4v1687272552210!5m2!1suz!2s"
                     className='regions__map'
                     allowfullscreen=""
                     loading="lazy"
                     referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Navbar