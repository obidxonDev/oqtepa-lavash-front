import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decFromCart, removeItem } from '../../context/cart'
import { BsFillTrash3Fill } from 'react-icons/bs'

function Cart() {

  const selector = useSelector(c => c.cart.cartItems)
  const dispatch = useDispatch()

  let totalPrice = 0
  for (let i = 0; i < selector.length; i++) {
    let itemPrice = selector[i].price * selector[i].cartQuantity
    totalPrice += itemPrice
  }


  return (
    <div className='cart container'>
      {
        selector.length > 0 ?
          <>
            <h1>Savatcha</h1>
            <div className="cart__container">
              <div className="cart__products">
                {
                  selector?.map(i => <div className='cart__item' key={i._id}>
                    <div className="cart__img">
                      <img width={50} src={i.url} alt="" />
                    </div>
                    <div className="cart__title__price">
                      <p className='cart__item__title'>{i.title}</p>
                      <p className='cart__item__price'><p style={{ color: '#E52D2B' }}> {i.price} </p> so'm</p>
                    </div>
                    <div className="cart__add__pro">
                      <div className="cart__btns">
                        <button onClick={() => dispatch(decFromCart(i))}>-</button>
                        <p>{i.cartQuantity}</p>
                        <button onClick={() => dispatch(addToCart(i))}>+</button>
                      </div>
                    </div>
                    <div className="cart__remove__item">
                      <BsFillTrash3Fill onClick={() => dispatch(removeItem(i))} />
                    </div>
                  </div>)
                }
              </div>
              <div className="cart__product__details">
                <h3 className='pro__details__title'>Buyurtmangiz</h3>
                <div className="address">
                  <span>Manzil:</span>
                  <p>Tshkent Shahar shayxontocur tumani 80-uy</p>
                </div>
                <hr />
                <div className="pro__total__price">
                  <span>
                    <p>Tovarlar</p>
                    <p>{totalPrice} so'm</p>
                  </span>
                  <span>
                    <p>Yetkazib Berish</p>
                    <p>0</p>
                  </span>
                </div>
                <hr />
                <div className="pro__btns">
                  <button>Buyurtmani Davom Ettirish</button>
                  <button>Buyurtmani Tasdiqlash</button>
                </div>
              </div>
            </div>
          </>
          :
          <div className='empty__container container'>
            <img src="https://blogzine.webestica.com/assets/images/icon/empty-cart.svg" alt="" />
            <h1>Sizning Savatchangiz Bo'sh :)</h1>
            <Link to={"/"} className="back__to__menu">Menuga Qaytish</Link>
          </div>
      }
    </div>
  )
}

export default Cart