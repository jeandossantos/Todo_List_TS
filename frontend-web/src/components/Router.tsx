import { Route, Routes } from 'react-router-dom';
import { AccountDisabled } from '../screens/AccountDisabled/AccountDisabled';
import { ConfirmEmail } from '../screens/ConfirmeEmail/ConfirmEmail';
import { Login } from '../screens/Login/Login';
import { Profile } from '../screens/Profile/Profile';
import { SignUp } from '../screens/SignUp/SignUp';
import { Tasks } from '../screens/Tasks/Tasks';
import { PrivateRoute } from './PrivateRoute';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />

      <Route path="/" element={<PrivateRoute element={<Tasks />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route
        path="/account-disabled"
        element={<PrivateRoute element={<AccountDisabled />} />}
      />

      <Route path="*" element={<Tasks />} />
    </Routes>
  );
}
