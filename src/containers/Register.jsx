import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import "../assets/styles/components/Register.scss"

const Register = () => {
  const history = useHistory()

  const user = useSelector(state => state.user)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = e => {
    e.preventDefault()
    /* console.log(form) */
    axios.post('/api/register', form)
      .then(res => res.data)
      .then(user => {
        alert("El usuario se creó con éxito.")
        history.push('/login')
      })
      .catch(error => console.log(error))
  }

  const handleInput = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <section className="register">
      <section className="register__container">
        <h2>Regístrate</h2>
        <form className="register__container--form" onSubmit={handleSubmit}>
          <input name="name" className="input" type="text" placeholder="Nombre" onChange={handleInput} />
          <input name="email" className="input" type="text" placeholder="Correo" onChange={handleInput}/>
          <input name="password" className="input" type="password" placeholder="Contraseña" onChange={handleInput} />
          <button className="button">Registrarme</button>
        </form>
        <Link to="/login">Iniciar sesión</Link>
      </section>
    </section>
  </>
  )
}

export default Register