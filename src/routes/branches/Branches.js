import React, { useState } from 'react'
import { MdLocationPin } from 'react-icons/md'
import './Branches.css'
import { useSelector } from 'react-redux'


function Branches() {
   const [btnId, setBtnId] = useState(0)
   const locs = JSON.parse(localStorage.getItem("user-region"))
   const selector = useSelector(s => s.reloadBranch.value)

   const branches__buttons = [
      {
         id: 0,
         text: "Ro'yxat"
      },
      {
         id: 1,
         text: 'Xarita'
      }
   ]

   return (
      <div className='branches__wrapper container'>
         <div className="branches__title">
            <h1>Filiallar</h1>
            <div className="branches__buttons">
               {
                  branches__buttons.map(i => <button
                     key={i.id}
                     onClick={() => setBtnId(i.id)}
                     style={btnId === i.id ? { backgroundColor: '#E52D2B', color: '#fff' } : { backgroundColor: '#F0F0F0', color: '#000' }}>{i.text}</button>)
               }
            </div>
         </div>
         <div className="branches__div__wrapper" style={btnId === 0 ? { display: 'block' } : { display: 'none' }}>
            <div className="branches__item">
               {
                  locs?.branches?.branch.map((i, id) => <div className='branches__div' key={id}>
                     <div className="branches__div__top">
                        <div className='branches__top__item'>
                           <span><MdLocationPin className='branches__loc__item' /></span>
                           <span>
                              {i}
                              <p className='branches__address'>Alisher Navoiy Ko'chasi 92-uy</p>
                           </span>
                        </div>
                        <div>
                           <p className='branches__closing'>Restoran 2:40da Yopiladi</p>
                        </div>
                     </div>
                     <div className="branch__div__bottom">
                        <div className="branches__bottom__item1">
                           <p className='branches__bottom__text'>Ish Vaqti:</p>
                           <span>Dush-Yak 10:00-02:40</span>
                        </div>
                        <div className="branches__bottom__item2">
                           <p className='branches__bottom__text'>Telefon:</p>
                           <span>+998936740003</span>
                        </div>
                     </div>
                  </div>)
               }
            </div>
         </div>
         <div className="branches__map" style={btnId === 0 ? { display: 'none' } : { display: 'flex' }}>
            <iframe 
               title='No One Is Perfect'
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12043.734284534381!2d71.646285116333!3d41.00482714250801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4beef2485ac1%3A0x316f055d9e451c6c!2sShodiyona!5e0!3m2!1suz!2s!4v1687272552210!5m2!1suz!2s" 
               className='branches__map'
               allowfullscreen="" 
               loading="lazy" 
               referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
         </div>
      </div>
   )
}

export default Branches