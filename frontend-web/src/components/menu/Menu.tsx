import { FaHome, FaPowerOff, FaUser } from 'react-icons/fa';
import userImg from '../../assets/images/user.svg';

import './style.css';
import { useAuth } from '../../hooks/useAuth';

import { Link } from 'react-router-dom';

export function Menu() {
  const { user, logout } = useAuth();

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    logout();
  }

  return (
    <ul className={`nav nav-pills ${user ? 'menu' : 'menu-hide'}`}>
      <li className="nav-item dropdown" hidden={!user ? true : false}>
        <a
          className="nav-link dropdown-toggle d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
          role="button"
          aria-expanded="false"
        >
          <span className="user-name">
            <strong>{user?.name}</strong>
          </span>
          <img
            className="user-img"
            src={
              user
                ? `http://localhost:3001/static/images/${user?.photo}`
                : userImg
            }
            alt="Foto"
          />
        </a>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="/">
              <FaHome /> Tarefas
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/profile">
              <FaUser /> Perfil
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a onClick={handleLogout} className="dropdown-item" href="#">
              <FaPowerOff /> Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
}
