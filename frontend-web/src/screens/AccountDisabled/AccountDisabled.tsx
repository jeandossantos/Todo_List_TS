import toast from 'react-hot-toast';
import { FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/axios';
import './styles.css';

export function AccountDisabled() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleActiveAccount() {
    api
      .patch(`/users/${user?.id}/reactivate`)
      .then((response) => {
        toast.success('Conta reativada.');

        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        toast.error('Algo deu errado. Tente novamente.');
      });
  }
  return (
    <div className="account-disabled">
      <span className="info">
        <p>
          <FaInfoCircle size={50} color="#17a2b8" />
        </p>
        <h1>Sua conta está desativada</h1>
        <p>
          Você desativou sua conta no dia &nbsp;
          {new Date(user?.deletedAt!).toLocaleDateString()} e será totalmente
          removida em aproximadamente 30 dias após a data de desativação. Se
          você quer reativar sua conta antes disso aconteça. Clique no botão
          abaixo.
        </p>
        <button className="btn btn-danger" onClick={handleActiveAccount}>
          Reativar minha conta
        </button>
      </span>
    </div>
  );
}
