import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/axios';
import './styles.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const json = localStorage.getItem(import.meta.env.VITE_MY_SECRET);

    if (json) navigate('/');
  }, []);

  async function handleLogin() {
    api
      .post('/login', { email, password })
      .then(({ data }) => {
        login(data);

        if (data.deletedAt) {
          navigate('/account-disabled');
          console.log(data);
        } else {
          navigate('/');
        }

        setEmail('');
        setPassword('');
      })
      .catch((error) => setPassword(''));
  }

  return (
    <div className="login">
      <form className="form">
        <h1 className="text-center">Faça login</h1>
        <label className="form-label">E-mail:</label>
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Insira o e-mail"
        />
        <label className="form-label mt-2">Senha:</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Insira a senha"
        />
        <div className="buttons d-grid mt-3 mb-3">
          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-login me-2"
          >
            LOGIN
          </button>
        </div>
        <div className="login-links">
          <Link to="/signUp">
            <small>Cadastra-se</small>
          </Link>
          <span> &nbsp; | &nbsp;</span>
          <Link to="#">
            <small>Esqueci a Senha</small>
          </Link>
        </div>
      </form>
      <hr />
    </div>
  );
}
