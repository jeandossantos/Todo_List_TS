import './styles.css';

export function Footer() {
  return (
    <footer className="footer">
      <small>
        <span>Copyright &copy; 2020 - NovaTask</span>
      </small>
      <span className="dev">
        <small>
          Desenvolvido por{' '}
          <a href="https://github.com/jeandossantos" target={'_blank'}>
            Jean dos Santos
          </a>
        </small>
      </span>
    </footer>
  );
}
