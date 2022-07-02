import './styles.css';
import ReactPaginate from 'react-paginate';

type TaskPaginationProps = {
  count: number;
  limit: number;
  handlePageChange: (nextPage: number) => void;
};

export function TaskPagination({
  count,
  limit,
  handlePageChange,
}: TaskPaginationProps) {
  return (
    <nav className="navigation" aria-label="Page navigation example">
      <ReactPaginate
        pageRangeDisplayed={5}
        className="pagination justify-content-center mt-2 mb-2"
        pageLinkClassName="page-link"
        pageClassName="page-item"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        nextLabel="Próximo"
        onPageChange={(e) => handlePageChange(e.selected + 1)}
        pageCount={Math.ceil(count / limit)}
        previousLabel="Anterior"
        renderOnZeroPageCount={undefined}
      />
    </nav>
  );
}
