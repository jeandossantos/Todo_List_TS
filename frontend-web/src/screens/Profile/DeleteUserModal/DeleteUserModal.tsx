type DeleteUserModalProps = {
  handleDeleteUser: () => void;
};

export function DeleteUserModal({ handleDeleteUser }: DeleteUserModalProps) {
  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      id="DeleteUserModal"
      tabIndex={1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center" id="exampleModalLabel">
              Tem certeza que deseja excluir sua conta?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Ao excluir sua conta, você ainda terá aproximadamente um mês para
              recuperar sua conta. Após esse tempo seus dados serão perdidos
              permanentemente.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleDeleteUser}
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Excluir agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
