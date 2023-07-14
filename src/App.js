import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from './features/authSlice';

const App = () => {
  const {isLoggedIn} = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const userData = { id: 1, name: 'John Doe' };
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, User!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
