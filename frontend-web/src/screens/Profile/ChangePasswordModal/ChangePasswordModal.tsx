import { FormEvent } from 'react';

type ChangePasswordModalProps = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
  handleChangePassword: (e: FormEvent) => void;
};

export function ChangePasswordModal({
  currentPassword,
  newPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  setCurrentPassword,
  setNewPassword,
  handleChangePassword,
}: ChangePasswordModalProps) {
  function handleCloseModal() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

  return (
    <div
      className="modal fade"
      id="ChangePasswordModal"
      tabIndex={1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center" id="exampleModalLabel">
              Confirmação
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <label className="form-label">Senha:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Informe a senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <label className="form-label mt-2">Nova Senha:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Informe a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label className="form-label mt-2">Confirmar Senha:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Repita a nova senha"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleChangePassword}
            >
              Alterar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
