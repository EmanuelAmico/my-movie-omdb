import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/static/logo-omdb.svg";
import userIcon from "../assets/static/user-icon.png";
import "../assets/styles/components/Header.scss"

const Header = (props) => {
  const { user, logoutRequest, isLogin, isRegister } = props;
  //isLogin y isRegister nos van a servir para saber donde estamos parados y que css se tiene que mostrar

  const hasUser = false
  
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
          <Link to={hasUser ? "/" : "/login"}>{hasUser ? "Email del usuario" : "Cuenta"}</Link>
        </li>
        <li>
          {!hasUser 
            ? <Link to="/login">Iniciar Sesión</Link>
            : <a href="#logout" onClick={handleLogout}>Cerrar Sesión</a>
          }
        </li>
      </ul>
    </div>
  </header>
  );
}

export default Header;
