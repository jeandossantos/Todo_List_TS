import './styles.css';
import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import br from 'date-fns/locale/pt-BR';
import { Task } from '../Tasks';
import { FaPlus } from 'react-icons/fa';
registerLocale('pt-BR', br);

type TaskFormModalProps = {
  id: string | undefined;
  name: string;
  description?: string;
  time?: Date | null;
  done: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setTime: Dispatch<SetStateAction<Date | null>>;
  setDone: Dispatch<SetStateAction<boolean>>;
  handleCreateTask: (task: Task) => void;
  handleUpdateTask: (task: Task) => void;
  handleResetTask: () => void;
};

export function TaskFormModal(props: TaskFormModalProps) {
  const { id, name, description, done, time } = props;
  const {
    setName,
    setDescription,
    setTime,
    setDone,
    handleCreateTask,
    handleResetTask,
    handleUpdateTask,
  } = props;

  return (
    <>
      <div className="d-grid d-sm-flex justify-content-sm-end">
        <button
          type="button"
          title="Adicionar nova tarefa"
          className="btn btn-add-task mb-4"
          data-bs-toggle="modal"
          data-bs-target="#TaskFormModal"
        >
          <FaPlus />
        </button>
      </div>
      <div
        className="modal fade"
        id="TaskFormModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Formulário de Tarefa
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleResetTask()}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nome:</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Informe o nome da tarefa"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição:</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                    placeholder="Detalhe esta tarefa aqui"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Prazo:</label>
                  <div className="col-4 pe-0">
                    <DatePicker
                      locale={'pt-BR'}
                      dateFormat="dd/MM/yyyy"
                      selected={time && new Date(time)}
                      onChange={(time) => {
                        setTime(time);
                      }}
                      showTimeSelect
                      timeIntervals={10}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3 mt-3 form-check">
                    <input
                      checked={done}
                      onChange={() => {
                        setDone(!done);
                      }}
                      type="checkbox"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Tarefa Feita?</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => handleResetTask()}
              >
                Fechar
              </button>
              {!id && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleCreateTask({ name, description, done, time })
                  }
                >
                  Salvar Tarefa
                </button>
              )}

              {id && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() =>
                    handleUpdateTask({ id, name, description, done, time })
                  }
                >
                  Salvar Alterações
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
