import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/static/logo-omdb.svg";
import userIcon from "../assets/static/user-icon.png";
import "../assets/styles/components/Header.scss"

const Header = () => { 

  const user = useSelector(state => state.user)
  const {isLoggedIn} = user

  const handleLogOut = () => {}

  return (
  <header className="header">
    <Link to="/">
      <img className="header__img" src={logo} alt="Platzi Video" />
      <i className="far fa-gem"></i>
    </Link>
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src={userIcon} alt="user" />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <Link to={isLoggedIn ? "/" : "/login"}>{isLoggedIn ? "Email del usuario" : "Cuenta"}</Link>
        </li>
        <li>
          {!isLoggedIn 
            ? <Link to="/login">Iniciar Sesión</Link>
            : <a href="#logout" onClick={handleLogOut}>Cerrar Sesión</a>
          }
        </li>
      </ul>
    </div>
  </header>
  );
}

export default Header;
