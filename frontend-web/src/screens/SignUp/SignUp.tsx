import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/axios';
import './styles.css';

export function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSignUp(e: FormEvent) {
    e.preventDefault();

    api
      .post('/signUp', {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        toast.success(
          'Conta criada com sucesso. Você será redirecionado para a tela de login.'
        );

        setEmail('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      });
  }

  return (
    <div className="signUp">
      <form className="form mt-2 mb-2">
        <h1 className="text-center">Crie sua conta</h1>
        <label className="form-label">Nome:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label mt-2">Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div id="emailHelp" className="form-text">
          Nunca vamos compartilhar seu email com terceiros.
        </div>

        <div className="row">
          <div className="col-md-6">
            <label className="form-label mt-2">Senha:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label mt-2">Confirmar Senha:</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
        </div>
        <div className="signUp-buttons d-grid mt-3">
          <button
            onClick={(e) => handleSignUp(e)}
            className="btn btn-signUp  mt-2"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
