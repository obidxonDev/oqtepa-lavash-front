import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import './AdminHeader.css'

function AdminHeader() {
  return (
    <div className='admin__header__wrapper'>
      <article className='admin__name'>Admin Profile</article>
      <ul className='admin__links'>
        <li><NavLink to={"/admin"}>Dashboard</NavLink></li>
        <li><NavLink to={"/admin/create-product"}>Create Product</NavLink></li>
        <li><NavLink to={"/admin/manage-product"}>Manage Product</NavLink></li>
        <li><NavLink to={"/admin/create-region"}>Create Region</NavLink></li>
        <li><NavLink >Accounts</NavLink></li>
        <li><NavLink>Settings</NavLink></li>
      </ul>
      <button className='log__out__btn'>Log Out</button>
    </div>
  )
}

export default AdminHeader