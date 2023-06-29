import React from 'react'
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import './SingleProduct.css'

function SingleProduct({ singleData, setSingleData }) {
    return (
        <React.Fragment>
            {singleData && <div onClick={() => setSingleData(null)} className='single__wrapper'></div>}
            {singleData && <div className="single__box container">
                <div className="img__box">
                    <AiOutlineClose className='close__svg2' onClick={() => setSingleData(null)} />
                    <AiOutlineHeart className='wishlist__svg2' />
                    <h2>{singleData.type}</h2>
                    <img src={singleData.url} alt="" />
                </div>
                <div className="content__box">
                    <AiOutlineClose className='close__svg' onClick={() => setSingleData(null)} />
                    <AiOutlineHeart className='wishlist__svg' />
                    <h1>{singleData.title}</h1>
                    <p>{singleData.desc}</p>
                    <button className='single__add__btn'>Qo'shish</button>
                </div>
            </div>}

        </React.Fragment>
    )
}

export default SingleProduct