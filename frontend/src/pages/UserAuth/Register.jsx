import "./Auth.css";

// Componensts
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import Message from "../../components/Message/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSliceUser";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.authUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      userName,
      email,
      telephone,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="container">
      <div className="login-register-box">
        <h1>Cadastra-se</h1>
        <form onSubmit={handleSubmit}>
          <div className="grup-form">
            <label htmlFor="username">Nome completo</label>
            <input
              type="text"
              placeholder="Digite o seu nome completo"
              onChange={(e) => setUserName(e.target.value)}
              value={userName || ""}
              autoFocus
            />
          </div>

          <div className="grup-form">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Digite o seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            />
          </div>

          <div className="grup-form">
            <label htmlFor="telephone">Telefone</label>
            <InputMask
              mask="+99 99 99999-9999"
              type="text"
              placeholder="Digite o seu telefone"
              onChange={(e) => setTelephone(e.target.value)}
              value={telephone || ""}
            />
          </div>

          <div className="grup-form">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </div>

          <div className="grup-form">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              type="password"
              placeholder="Digite a confirmação de senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword || ""}
            />
          </div>

          {error && <Message msg={error} type="error" />}
          {!loading && <button type="submit">Criar conta</button>}
          {loading && (
            <button type="submit" disabled>
              Aguarde...
            </button>
          )}
          <p className="testeConta">
            <span>
              Já tem uma conta?
              <Link to="/login"> Entrar</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
