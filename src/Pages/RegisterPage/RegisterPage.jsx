import React from 'react'
import AuthenticationComponent from '../../Components/AuthenticationComponent'
import { BiAt } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { IoPersonCircleSharp } from "react-icons/io5"
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <AuthenticationComponent>
      <div className='content'>
        <h3>Create account</h3>
        <form className="login__form-content">
          <div className="input-box">
            <IoPersonCircleSharp />
            <input type="password" className='input'
              placeholder=" "
            />
            <label htmlFor="">Fullname</label>
          </div>

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

          <div className="input-box">
            <RiLockPasswordFill />
            <input type="password" className='input'
              placeholder=" "
            />

            <label htmlFor="">Confirm Password</label>
          </div>

          <div className='dropdown'>
            <select>
              <option value="">Choose option: Customer or Provider</option>
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
            </select>
          </div>

          <div className='password-feature'>
            <div className='remember'>
              <input type='checkbox' id="agree"></input>
              <label htmlFor="agree">I agree with <span className="text-swap">Terms</span> and <span className="text-swap">Privacy</span></label>
            </div>

          </div>

          <div className='btn-login'>Sign up</div>

          <p className='text'>Already have an account?
            <Link to='/login' className="text-swap" > Log in</Link>
          </p>
        </form>
      </div>
    </AuthenticationComponent>
  )
}

export default RegisterPage