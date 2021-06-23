import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import googleIcon from "../assets/static/google-icon.png"
import twitterIcon from "../assets/static/twitter-icon.png"
import "../assets/styles/components/Login.scss"
import { setUser } from '../redux/user';

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, rememberMe } = form
    axios.post('/api/login', { email, password })
      .then(res => res.data)
      .then(({ token }) => {
        if(rememberMe)
          localStorage.setItem('userToken', token)
        dispatch(setUser({ ...user, isLoggedIn: true, token }))
        alert("Se ha logueado con éxito.")
        history.push('/')
      })
      .catch(error => {
        //NOTE Sí el response status es del 400 en adelante cae acá el axios
        //TODO chequear sí para status de >300 cae acá también
        /* console.log(error) */
        if(error.response.status === 400 || 401)
          alert("Credenciales inválidas")
      })
  }

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.checked
    })
  }

  return (
    <>
      <section className="login">
      <section className="login__container">
        <h2>Inicia sesión</h2>
        <form className="login__container--form" onSubmit={handleSubmit}>
          <input name="email" className="input" type="text" placeholder="Correo" onChange={handleInput}/>
          <input name="password" className="input" type="password" placeholder="Contraseña" onChange={handleInput}/>
          <button className="button">Iniciar sesión</button>
          <div className="login__container--remember-me">
            <label>
              <input type="checkbox" name="rememberMe" onChange={handleCheck} />Recuérdame
            </label>
          </div>
        </form>
        <section className="login__container--social-media">
          <div><img src={googleIcon}/> Inicia sesión con Google</div>
          <div><img src={twitterIcon}/> Inicia sesión con Twitter</div>
        </section>
        <p className="login__container--register">No tienes ninguna cuenta <Link to="/register">Regístrate</Link></p>
      </section>
    </section>
  </>
  )
}

export default Login