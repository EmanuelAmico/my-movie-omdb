import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/static/logo-omdb.svg";
import userIcon from "../assets/static/user-icon.png";
import "../assets/styles/components/Header.scss"
import { setUser } from "../redux/user";
import generateAxios from "../utils/generateAxios";

const Header = () => { 
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const {isLoggedIn, name, email} = user

  useEffect(() => {
    if(isLoggedIn) {
      const server = generateAxios(user.token)
      server.get('/users/me')
        .then(res => res.data)
        .then(({name, email}) => dispatch(setUser({ ...user, name, email })))
    }
  }, [isLoggedIn]) 

  const handleLogOut = () => {
    localStorage.removeItem('userToken')
    dispatch(setUser({
      isLoggedIn: false,
      name: null,
      email: null,
      token: null,
    }))
  }

  return (
  <header className="header">
    <Link to="/">
      <img className="header__img" src={logo} alt="Platzi Video" />
      <i className="far fa-gem"></i>
    </Link>
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src={userIcon} alt="user" />
        <p>{isLoggedIn ? name : "Perfil"}</p>
      </div>
      <ul>
        <li>
          <Link to={isLoggedIn ? "/" : "/login"}>{isLoggedIn ? email : "Cuenta"}</Link>
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
