import loading from '../../assets/images/loading.gif';
import './styles.css';

export function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="Loading..." />
    </div>
  );
}
