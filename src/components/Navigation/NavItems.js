import React from 'react';
import {NavLink} from 'react-router-dom'



const NavItems = (props) =><li ><NavLink exact to={props.link}>{props.children}</NavLink></li>


export default NavItems;
