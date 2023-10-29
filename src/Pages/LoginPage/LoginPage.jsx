import React, { useState } from 'react';
import AuthenticationComponent from '../../Components/AuthenticationComponent';
import ForgotPasswordComponent from '../../Components/ForgotPasswordComponent';
import InputField from '../../Components/Shared/InputField';
import { BiAt } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import './style.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Store/userSlice';

const LoginPage = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  // Redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({ username: '', password: '' });

    // Validation
    let hasErrors = false;
    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Please enter your username!' }));
      hasErrors = true;
    } 

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Please enter your password!' }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const userCredentials = { username, password };

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setUsername('');
        setPassword('');

        switch (result.payload.role) {
          case 'Customer':
            navigate('/');
            break;
          case 'Provider':
            navigate('/provider');
            break;
          case 'Admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/');
            break;
        }
      }
    });

  };

  return (
    <AuthenticationComponent>
      <div className="content">
        <h3>Welcome Back!</h3>
        <form className="login__form-content" onSubmit={handleLogin}>

          <InputField
            icon={BiAt}
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            error={errors.username}
          />

          <InputField
            icon={RiLockPasswordFill}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            error={errors.password}
          />

          <div className="password-feature">
            <div className="remember">
              <input type="checkbox" id="remember"></input>
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot" onClick={() => setShowForgotPasswordModal(true)}>
              Forgot password?
            </div>

            {showForgotPasswordModal ? (
              <ForgotPasswordComponent onClose={() => setShowForgotPasswordModal(false)} />
            ) : (
              <></>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-full mt-1 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button className="btn-login">{loading ? 'Loading ...' : 'Sign in'}</button>

          <div className="btn-login btn-login-google">
            <FcGoogle />
            <p>Sign in with Google</p>
          </div>

          <p className="text">
            Don't have an account?
            <Link to="/register" className="text-swap">
              {' '}
              Register
            </Link>
          </p>
        </form>
      </div>
    </AuthenticationComponent>
  );
};

export default LoginPage;