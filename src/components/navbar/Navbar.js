import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { viloyatlar } from '../../static/static' 
import './Navbar.css'
import { MdLocationPin } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import { GiEarthAmerica } from 'react-icons/gi'
import usaFlag from '../../assets/usaflag.png'
import uzbFlag from '../../assets/uzbekistanflag.png'
import rusFlag from '../../assets/russiaflag.png'
import ReactSelect from 'react-select'

function Navbar() {
   
   const countries = [
      { value: 'uz', label: "UZ", image: uzbFlag },
      { value: 'en', label: 'EN', image: usaFlag },
      { value: 'ru', label: 'RU', image: rusFlag }
   ];

   const [region, setRegion] = useState(false)
   const [userRegion, setUserRegion] = useState(null)

   useEffect(() => {
      const savedRegion = localStorage.getItem("user-region")
      if(savedRegion){
         setUserRegion(JSON.parse(savedRegion))
      } else{
         setRegion(true)
      }
   }, [])

   function handleSetRegion(user){
      setUserRegion(user)
      localStorage.setItem("user-region", JSON.stringify(user))
      setRegion(false)
   }
      
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
                  <MdLocationPin />
                  <span className='delivery__text'>
                     <p className='navbar__text'>Yetkazib Berish yoki</p>
                     <p>Olib Ketish Turini Tanlang</p>
                  </span>
                  <GiEarthAmerica />
                  <span className='location__text' onClick={() => setRegion(true)}>
                     <p className='navbar__text'>Hudud</p>
                     <p>{userRegion && userRegion.loc}</p>
                  </span>
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
                  <Link className='link__cart'>Savatcha</Link>
               </div>
            </div>
         </div>
         <div style={region ? {display: 'flex'} : {display: 'none'}} className="region__container">
            <div className="region__box">
               <h2>Hududingizni Tanlang</h2>
               <ul>
                  {
                     viloyatlar.map(i => <li onClick={() => handleSetRegion(i)} key={i.id} >{i.loc}</li>)
                  }
               </ul>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Navbar