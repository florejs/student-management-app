import React, { memo } from 'react'
import { 
  FcMenu, 
  FcRefresh } from "react-icons/fc"
import {NavLink} from 'react-router-dom'
import './sidebar.css'


export default memo(function index() {
  return (
    <div className="left-sidebar">
      <ul className="menu">
        <li className="menu__list-item">
          <NavLink activeClassName="active" to="/dashboard" className="menu__link--sublist">
            <FcMenu/>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink activeClassName="active" to="/student/s" className="menu__link--sublist">
            <FcRefresh/>
            <span>Students</span>
          </NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink activeClassName="active" to="/sales-guy" className="menu__link--sublist">
            <FcRefresh/>
            <span>Sales Guy</span>
          </NavLink>
        </li>
        <li className="menu__list-item">
          <NavLink activeClassName="active" to="/tag" className="menu__link--sublist">
            <FcRefresh/>
            <span>Tags</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
})