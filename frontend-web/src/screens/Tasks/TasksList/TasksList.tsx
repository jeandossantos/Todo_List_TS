import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';

import { Task } from '../Tasks';

type TasksListProps = {
  tasks: Task[];
  handleMarkTaskAsDoneOrPending: (taskId: string, taskStatus: boolean) => void;
  handleShowTask: (task: Task) => void;
  handleRemoveTask: (id: string) => void;
};

export function TasksList({
  tasks,
  handleMarkTaskAsDoneOrPending,
  handleShowTask,
  handleRemoveTask,
}: TasksListProps) {
  function renderTasksList() {
    return tasks?.map((task) => {
      return (
        <li
          key={task.id}
          className={`list-group-item d-flex justify-content-between ${
            task.done && 'disabled'
          }`}
        >
          <span>
            <input
              className="form-check-input me-2"
              checked={task.done}
              onChange={(e) =>
                handleMarkTaskAsDoneOrPending(task.id!, !task.done!)
              }
              type="checkbox"
              value=""
              aria-label="..."
            />
            {task.name}
          </span>
          <span className="tasks-buttons">
            <button
              className="btn btn-primary"
              onClick={() => handleShowTask({ ...task })}
              data-bs-toggle="modal"
              data-bs-target="#ShowTaskModal"
              title="Detalhes da tarefa"
            >
              <FaEye />
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleShowTask({ ...task })}
              data-bs-toggle="modal"
              data-bs-target="#TaskFormModal"
              title="Editar tarefa"
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveTask(task.id!)}
              title="Excluir tarefa"
            >
              <FaTrashAlt />
            </button>
          </span>
        </li>
      );
    });
  }

  return <ul className="list-group mb-6">{renderTasksList()}</ul>;
}
