type ShowTaskModalProps = {
  name: string;
  description?: string;
  time?: Date | null;
  done: boolean;
  createdAt: Date;
  handleResetTask: () => void;
};

export function ShowTaskModal(props: ShowTaskModalProps) {
  const { name, description, done, time, createdAt, handleResetTask } = props;

  return (
    <div className="modal fade" tabIndex={-1} id="ShowTaskModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalhes da Tarefa</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleResetTask()}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <b>Criada em: </b>
              {createdAt && new Date(createdAt).toLocaleDateString()}
            </p>
            <p>
              <b>Nome: </b>
              {name}
            </p>
            <p>
              <b>Descrição: </b>{' '}
              {description ? description : 'Não há descrição para está tarefa.'}
            </p>
            <p>
              <b>Prazo: </b>
              {time ? new Date(time).toLocaleString() : 'Prazo não informado.'}
            </p>
            <p>
              <b>Status da Tarefa: </b>
              {done ? 'Feita' : 'Pendente'}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleResetTask}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
