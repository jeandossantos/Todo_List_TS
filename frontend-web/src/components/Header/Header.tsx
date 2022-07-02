import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';
import './styles.css';

export function Header() {
  return (
    <header className="header">
      <Link to={'/login'}>
        <img className="logo-img" src={logoImg} alt="NovaTask" />
      </Link>
    </header>
  );
}
