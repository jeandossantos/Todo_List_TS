import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { api } from '../../services/axios';
import { BiError } from 'react-icons/bi';
import './styles.css';
import { MdDone } from 'react-icons/md';

export function ConfirmEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [wasUserConfirmed, setWasUserConfirmed] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    api
      .patch(`/users/${searchParams.get('id')}/confirm`)
      .then((response) => {
        setWasUserConfirmed(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setWasUserConfirmed(false);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div className="confirm-email">
      <div className="info">
        {wasUserConfirmed && (
          <>
            <span className="icon">
              <MdDone color="green" />
            </span>
            <h1>Parabéns!</h1>
            <p>
              Seu e-mail foi confirmado com sucesso. Você já pode fazer seu
              login <Link to={'/'}>aqui</Link>.
            </p>
          </>
        )}

        {!wasUserConfirmed && (
          <>
            <span className="icon">
              <BiError color="red" />
            </span>
            <h1>Algo deu errado!</h1>
            <p>
              Algum problema ocorreu e não foi possível confirmar seu e-mail.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
