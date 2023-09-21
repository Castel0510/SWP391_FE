import React, { useState } from 'react'
import AuthenticationComponent from '../../Components/AuthenticationComponent'
import ForgotPasswordComponent from '../../Components/ForgotPasswordComponent'
import { BiAt } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { FcGoogle } from "react-icons/fc"
import './style.scss'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  return (
    <AuthenticationComponent>
      <div className='content'>
        <h3>Welcome Back!</h3>
        <form className="login__form-content">
          <div className="input-box">
            <BiAt />
            <input type="text" className='input'
              placeholder=" "
            />
            <label htmlFor="">Email address</label>
          </div>

          <div className="input-box">
            <RiLockPasswordFill />
            <input type="password" className='input'
              placeholder=" "
            />

            <label htmlFor="">Password</label>
          </div>

          <div className='password-feature'>
            <div className='remember'>
              <input type='checkbox' id="remember"></input>
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className='forgot' onClick={() => setShowForgotPasswordModal(true)}>Forgot password?</div>

            {showForgotPasswordModal ? <ForgotPasswordComponent onClose={() => setShowForgotPasswordModal(false)}/> : <></>}
            
          </div>

          <div className='btn-login'>Sign in</div>
          <div className='btn-login btn-login-google'>
            <FcGoogle />
            <p>Sign in with Google</p>
          </div>

          <p className='text'>Don't have an account? 
            <Link to='/register' className="text-swap"> Register</Link>
          </p>
        </form>
      </div>
    </AuthenticationComponent>
  )
}

export default LoginPage