import React from 'react';
import burgerlogo from '../assets/burger-logo.png'
import NavItems from "./Navigation/NavItems"

const Toolbar = (props) => {

    let content = (
        <>
            <NavItems active={true} link="/">Burger</NavItems>
            <NavItems active={false} link="/auth">Sign In</NavItems>
        </>
    )
  //  console.log(props.isAuthenticated)
    if (props.isAuthenticated) {
        content = (
            <>
                <NavItems active={true} link="/">Burger</NavItems>
                <NavItems active={false} link="/orders">Orders</NavItems>
                <NavItems active={false} link="/logout">Log Out</NavItems>
            </>
        )
    }

    return (
        <header>
            <nav className="navbar">


                <img src={burgerlogo} className="navbar__logo" ></img>
                <div className="navbar__menu">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                    <section id="backdrop" className=""></section>
                </div>
                <ul className="navbar__list">

                    {content}
                </ul>
            </nav>
        </header>
    )
}

export default Toolbar;