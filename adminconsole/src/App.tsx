import './App.css';
import Login from './components/Login';
import AdminConsole from './components/Admin/AdminConsole';
import {Routes, Route} from 'react-router-dom'
import Dashboard from './components/Admin/Dashboard';
import Users from './components/Admin/Users';
import Inventory from './components/Admin/Inventory';
import Softwares from './components/Admin/Softwares';
import { Bounce, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { getLoggedInUserRequest } from './redux/users/user.actions';
import Bitlocker from './components/Admin/Bitlocker';
import Server from './components/Admin/Server';

function App() {
  const dispatch = useDispatch();
window.addEventListener('error', (e) => {
    // const suppressedErrors = ['ResizeObserver loop completed'];
    // const isSuppressed = suppressedErrors.some((msg) =>
    //   e.message.includes(msg)
    // );
    // if (isSuppressed) {
      e.stopImmediatePropagation(); // stops Create React App from showing red screen
    // }
  });

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/adminconsole' element={<AdminConsole />}>
          <Route index path='dashboard' element = {<Dashboard />} />
          <Route path='users' element = {<Users />} />
          <Route path = 'inventory' element = {<Inventory />} />
          <Route path='bitlocker' element = {<Bitlocker />} />
          <Route path='servers' element = {<Server />} />
        </Route>
      </Routes>

      <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />

      </>
  );
}

export default App;
