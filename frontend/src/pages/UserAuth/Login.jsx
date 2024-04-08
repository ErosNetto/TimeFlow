import "./Auth.css";

// Componensts
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="container">
      <div className="login-register-box">
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          <div className="grup-form">
            <label htmlFor="email">E-mail</label>
            <input type="email" placeholder="Digite o seu e-mail" autoFocus />
          </div>

          <div className="grup-form">
            <label htmlFor="password">Senha</label>
            <input type="password" placeholder="Digite sua senha" />
          </div>

          <button type="submit">Login</button>
          <p className="testeConta">
            <span>
              Não possui uma conta?
              <Link to="/user/register"> Cadastrar</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
