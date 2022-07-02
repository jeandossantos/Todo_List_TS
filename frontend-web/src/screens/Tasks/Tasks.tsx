import './styles.css';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { api } from '../../services/axios';
import { TaskFormModal } from './TaskFormModal/TaskFormModal';
import { ShowTaskModal } from './ShowTaskModal/ShowTaskModal';
import { TaskPagination } from './TaskPagination/TaskPagination';
import { TasksList } from './TasksList/TasksList';
import { SearchTaskForm } from './SearchTaskForm/SearchTaskForm';

export type Task = {
  id?: string;
  userId?: string;
  name: string;
  description?: string;
  time?: Date | null;
  done: boolean;
  createdAt?: Date;
};

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [count, setCount] = useState(0);

  const [search, setSearch] = useState('');

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState<Date | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [createdAt, setCreatedAt] = useState<Date | null>();

  useEffect(() => {
    handleFindTasks();
  }, [currentPage]);

  function handleFindTasks(search: string = '') {
    api.get(`/tasks?search=${search}&page=${currentPage}`).then((response) => {
      setCount(response.data.count);
      setLimit(response.data.limit);
      setTasks(response.data.tasks);
    });
  }

  function handleCreateTask({ name, description, done, time }: Task) {
    api
      .post('/tasks', {
        name,
        description,
        done,
        time,
      })
      .then(() => {
        toast.success('Tarefa criada.');
        handleResetTask();
        handleFindTasks();
      });
  }

  function handleUpdateTask({ id, name, description, done, time }: Task) {
    api
      .put(`/tasks/${id}`, {
        name,
        description,
        done,
        time,
      })
      .then(() => {
        toast.success('Alterações Salvas.');
        handleResetTask();
        handleFindTasks(search);
      });
  }

  function handleRemoveTask(taskId: string) {
    api.delete(`/tasks/${taskId}`).then((response) => {
      toast.success('Tarefa removida.');
      handleFindTasks(search);
    });
  }

  function handleSearch(e: FormEvent & { key: string }) {
    if (e.key === 'Enter') {
      handleFindTasks(search);
    }

    if (e.key === 'Escape') {
      setSearch('');
      handleFindTasks();
    }
  }

  function handleMarkTaskAsDoneOrPending(taskId: string, taskStatus: boolean) {
    api.patch(`/tasks/${taskId}/done`, { taskStatus }).then((response) => {
      if (taskStatus) {
        toast.success('Tarefa marcada como feita.');
      }

      if (!taskStatus) {
        toast.success('Tarefa marcada como pendente.');
      }

      handleFindTasks(search);
    });
  }

  function handleSetTask(
    id: string,
    name: string,
    description: string,
    time: Date | null,
    done: boolean,
    createdAt: Date
  ) {
    setId(id);
    setName(name);
    setDescription(description);
    setTime(time);
    setDone(done);
    setCreatedAt(createdAt);
  }

  function handleShowTask({
    id,
    name,
    description = '',
    time = null,
    done,
    createdAt,
  }: Task) {
    handleSetTask(id!, name, description, time, done, createdAt!);
  }

  function handleResetTask() {
    setId('');
    setName('');
    setDescription('');
    setDone(false);
    setTime(null);
    setCreatedAt(null);
  }

  function handlePageChange(selected: number) {
    setCurrentPage(selected);
  }

  return (
    <div className="tasks">
      <h1 className="text-center pt-3">Lista de Tarefas</h1>

      <TaskFormModal
        id={id}
        name={name}
        description={description}
        time={time!}
        done={done}
        setName={setName}
        setDescription={setDescription}
        setTime={setTime}
        setDone={setDone}
        handleCreateTask={handleCreateTask}
        handleUpdateTask={handleUpdateTask}
        handleResetTask={handleResetTask}
      />

      <SearchTaskForm
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
        handleFindTasks={handleFindTasks}
      />

      <TasksList
        tasks={tasks}
        handleMarkTaskAsDoneOrPending={handleMarkTaskAsDoneOrPending}
        handleRemoveTask={handleRemoveTask}
        handleShowTask={handleShowTask}
      />

      <ShowTaskModal
        name={name}
        description={description}
        time={time}
        done={done}
        createdAt={createdAt!}
        handleResetTask={handleResetTask}
      />

      <TaskPagination
        limit={limit}
        count={count}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
