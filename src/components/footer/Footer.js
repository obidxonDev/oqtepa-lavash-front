import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsInstagram, BsPhone, BsPhoneFill, BsTelegram, BsTelephoneFill } from 'react-icons/bs'
import Logo from '../../assets/logo.svg'
import './Footer.css'

function Footer() {

   const path = useLocation()

   if(path.pathname.includes("/login") || path.pathname.includes("/admin")){
      return <></>
    }

  return (
    <div className='footer__wrapper'>
      <div className="footer__container container">
         <div className="footer__items">
            <div className="footer__img">
               <img src={Logo} alt="" />
            </div>
            <ul>
               <li><Link>Menu</Link></li>
               <li><Link>Filiallar</Link></li>
            </ul>
            <ul>
               <li><Link>Biz Haqimizda</Link></li>
               <li><Link>Kontaktlar</Link></li>
            </ul>
            <ul>
               <li><BsTelephoneFill/><Link>+998936740003</Link></li>
               <li><BsTelephoneFill/><Link>+998936740003</Link></li>
            </ul>
            <ul>
               <li><BsInstagram/><Link>Instagram</Link></li>
               <li><BsTelegram/><Link>Telegram</Link></li>
            </ul>
         </div>
         <div className="sub__footer">
            <span>@oqtepalavashdwd</span>
            <span>All Rights Reserved</span>
         </div>
      </div>
    </div>
  )
}

export default Footer