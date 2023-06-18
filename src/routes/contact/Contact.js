import React from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

function Contact() {
  return (
    <div className='contact__page__wrapper container'>
      <div className="contact__container">
         <h2>Biz Bilan Bog'laning</h2>
         <div className="contact__imgs">
            <img className='contact__banner__img' src="https://oqtepalavash.uz/assets/images/contacts_img.jpg" alt="" />

            <div className="qr__code">
               <img src="https://oqtepalavash.uz/assets/images/qr_oqtepa_contact.png" alt="" />
               <h4>Izoh Qoldiring Yoki</h4>
               <h4>Telegramda Savol Bering</h4>
               <h4><Link to={"https://t.me/ReactCoder"}>@ReactCoder</Link></h4>
            </div>
         </div>
         <h2 className='contact__call'>Yagona Aloqa Markazi</h2>
         <p className='contact__desc'>+998946740003</p>
         <h2 className='contact__tg'>Telegram Bot</h2>
         <p className='contact__desc'>@ReactCoder</p>
      </div>
    </div>
  )
}

export default Contact