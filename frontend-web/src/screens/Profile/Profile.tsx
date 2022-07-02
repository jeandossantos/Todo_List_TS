import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/axios';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal';
import { DeleteUserModal } from './DeleteUserModal/DeleteUserModal';
import './styles.css';

export function Profile() {
  const { user, setUser, logout } = useAuth();
  const [name, setName] = useState(user?.name);
  const [isNameEdited, setIsNameEdited] = useState(true);
  const [isPhotoSelected, setIsPhotoSelected] = useState(true);

  const [photo, setPhoto] = useState<File>();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    name === user?.name ? setIsNameEdited(true) : setIsNameEdited(false);
  }, [name, user?.name]);

  function handleUpdateName(e: FormEvent) {
    e.preventDefault();
    api.patch(`/users/${name}`).then((response) => {
      console.log(user);

      localStorage.setItem(
        import.meta.env.VITE_MY_SECRET,
        JSON.stringify({ ...user, name })
      );

      setUser({
        id: user?.id!,
        name: name!,
        email: user?.email || '',
        photo: user?.photo || '',
        token: user?.token!,
      });

      toast.success('Nome alterado com sucesso.');
    });
  }

  function handleDeleteUser() {
    api.delete(`/users/${user?.id}`).then((response) => {
      toast.success('Conta excluída com sucesso.');

      const timeOut = setTimeout(() => {
        logout();
      }, 5000);
    });
  }

  function handleChangePassword(e: FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('Senhas não coincidem.');
      return;
    }

    api
      .patch('/users/update/password', {
        currentPassword,
        newPassword,
        confirmNewPassword,
      })
      .then((response) => {
        toast.success('Senha alterado com sucesso.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');

        const timeOut = setTimeout(() => {
          logout();
        }, 5000);
      })
      .catch((error) => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      });
  }

  function handleUploadPhoto(files: FileList) {
    setPhoto(files.item(0)!);
    setIsPhotoSelected(false);
  }

  function handleChangePhoto(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();
    data.append('photo', photo!);

    api
      .patch('/users/update/photo', data)
      .then(({ data }) => {
        toast.success('Foto Alterada com sucesso.');

        localStorage.setItem(
          import.meta.env.VITE_MY_SECRET,
          JSON.stringify({ ...user, photo: data.fileName })
        );

        setUser({
          ...user!,
          photo: data.fileName,
        });

        setIsPhotoSelected(true);
        setPhoto(undefined);
      })
      .catch((error) => {
        toast.error('Não foi possível alterar a foto.');
      });
  }

  return (
    <div className="profile d-flex flex-column">
      <div className="form">
        <h1 className="text-center">Perfil do Usuário</h1>
        <div className="row">
          <div className="col-10 pe-0">
            <label className="form-label">Foto:</label>
            <input
              className="form-control"
              type="file"
              accept="application/image"
              onChange={(e) => handleUploadPhoto(e.currentTarget.files!)}
            />
          </div>
          <div className="col-2 ps-0 d-flex justify-content-end align-items-end">
            <button
              disabled={isPhotoSelected}
              onClick={handleChangePhoto}
              className="btn btn-warning"
            >
              <FaUpload />
            </button>
          </div>
          <div className="col-10 pe-0">
            <label className="form-label">Nome: </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-2 ps-0 d-flex justify-content-end align-items-end">
            <button
              disabled={isNameEdited}
              className="btn btn-warning"
              title="Editar nome"
              onClick={handleUpdateName}
            >
              <FaSave />
            </button>
          </div>
        </div>

        <label className="form-label mt-2 pe-1">E-mail:</label>
        <input
          type="text"
          className="form-control"
          value={user?.email}
          disabled
        />
      </div>

      <div className="profile-buttons  d-flex justify-content-between">
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#ChangePasswordModal"
        >
          <RiLockPasswordFill size={20} /> Mudar Senha
        </button>

        <button
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#DeleteUserModal"
        >
          <FaTrash size={15} /> Deletar Conta
        </button>
      </div>
      <DeleteUserModal handleDeleteUser={handleDeleteUser} />

      <ChangePasswordModal
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        handleChangePassword={handleChangePassword}
      />
    </div>
  );
}
