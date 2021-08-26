import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../assets/styles/components/Register.scss";
import API_URL from "../config/env";
import generateNotification from "../utils/generateNotification";

const Register = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    name: "pepito",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/api/register`, form)
      .then((res) => res.data)
      .then((user) => {
        generateNotification("success", "¡Exitoso!", "El usuario se creó con éxito.");
        history.push("/login");
      })
      .catch((error) => {
        if (error.response.status === 302) {
          generateNotification("error", "¡Error!", "El email ya está registrado. Olvidaste tu contraseña?");
          history.push("/login");
        }
      });
  };

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form className="register__container--form" onSubmit={handleSubmit}>
            <input
              name="name"
              className="input"
              type="text"
              placeholder="Nombre"
              onChange={handleInput}
            />
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleInput}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={handleInput}
            />
            <button className="button">Registrarme</button>
          </form>
          <Link to="/login">Iniciar sesión</Link>
        </section>
      </section>
    </>
  );
};

export default Register;
