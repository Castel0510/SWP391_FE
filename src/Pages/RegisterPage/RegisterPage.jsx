import React, { useState } from 'react'
import AuthenticationComponent from '../../Components/AuthenticationComponent'
import InputField from '../../Components/Shared/InputField'

import { BiAt } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { IoPersonCircleSharp } from "react-icons/io5"
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, loginUser } from '../../Store/userSlice';


const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [role, setRole] = useState('');

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPwd: '',
    role: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrors({
      fullName: '',
      email: '',
      password: '',
      confirmPwd: '',
      role: ''
    });

    let hasErrors = false;

    if (!fullName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: 'Please enter your full name!'
      }));
      hasErrors = true;
    }

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email!'
      }));
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email!'
      }));
      hasErrors = true;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter your password!'
      }));
      hasErrors = true;
    }

    if (password !== confirmPwd) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPwd: 'Passwords do not match!'
      }));
      hasErrors = true;
    }

    if (!role) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: 'Please choose a role!'
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const userCredentials = {
      fullName,
      email,
      password,
      role
    };

    dispatch(createUser(userCredentials));

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        navigate('/')
      }
    })

  };

  return (
    <AuthenticationComponent>
      <div className='content'>
        <h3>Create account</h3>
        <form className="login__form-content" onSubmit={handleSignup}>

          <InputField
            icon={IoPersonCircleSharp}
            type="text"
            value={fullName}
            onChange={(e) => setPassword(e.target.value)}
            label="Fullname"
            error={errors.fullName}
          />

          <InputField
            icon={BiAt}
            type="text"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            error={errors.email}
          />

          <InputField
            icon={RiLockPasswordFill}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            error={errors.password}
          />

          <InputField
            icon={RiLockPasswordFill}
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            label="Confirm Password"
            error={errors.confirmPwd}
          />

          <div className='dropdown'>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose option: Customer or Provider</option>
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
            </select>
          </div>

          {errors.role && <span className="text-red-600">{errors.role}</span>}

          <div className='password-feature'>
            <div className='remember'>
              <input type='checkbox' id="agree"></input>
              <label htmlFor="agree">I agree with <span className="text-swap">Terms</span> and <span className="text-swap">Privacy</span></label>
            </div>

          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-full mt-1 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button type="submit" className='btn-login'>Sign up</button>

          <p className='text'>Already have an account?
            <Link to='/login' className="text-swap" > Log in</Link>
          </p>
        </form>
      </div>
    </AuthenticationComponent>
  )
}

export default RegisterPage