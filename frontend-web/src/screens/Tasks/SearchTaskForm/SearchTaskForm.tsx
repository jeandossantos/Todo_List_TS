import { FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import './styles.css';

type SearchTaskFormProps = {
  handleFindTasks: () => void;
  handleSearch: (e: FormEvent & { key: string }) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
};

export function SearchTaskForm({
  handleFindTasks,
  handleSearch,
  setSearch,
  search,
}: SearchTaskFormProps) {
  return (
    <div className="d-flex gap-1 justify-content-sm-center mb-2">
      <input
        type="text"
        style={{
          maxWidth: 600,
        }}
        className="form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleSearch}
        placeholder="Pesquise suas tarefas aqui..."
      />

      <button
        type="button"
        onClick={handleFindTasks}
        className="btn btn-search"
        title="Pesquisar"
      >
        <FaSearch />
      </button>
      <button
        type="button"
        onClick={handleFindTasks}
        className="btn btn-danger"
        title="Limpar campo de pesquisa"
      >
        <MdClear />
      </button>
    </div>
  );
}
