import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from "../../components/Error";
import { registerUser } from '../../redux/modules/userActions';

import React from "react";

function RegisterForm({ loginToggle, goRegister }) {

  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    // if (userInfo) navigate('/user-profile')
    // redirect user to login page if registration was successful
    // if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.passwordConfirm) {
      setCustomError('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    // data.username = data.username.toLowerCase()
    console.log(data);
    dispatch(registerUser(data))
  }





  return (
    <StRegisterBox className="Register"  onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="registerBox">
        <span className="login" onClick={loginToggle}>
          로그인
        </span>
        {goRegister === true ? (
          <span
            className="register"
            style={{ borderBottom: "2px solid rgba(225, 225, 225, 0.8)" }}
          >
            회원가입
          </span>
        ) : (
          <span className="register">회원가입</span>
        )}
      </div>
      <div className="inputbox">
        <p>아이디</p>
        <input  
        type='text'
         {...register('username')}
         required
         />
      </div>
      <div className="inputbox">
        <p>비밀번호</p>
        <input 
         type='password'
         className='form-input'
         {...register('password')}
         required
         />
      </div>
      <div className="inputbox">
        <p>비밀번호재확인</p>
        <input 
         type='password'
         className='form-input'
         {...register('passwordConfirm')}
         required
         />
      </div>
      <button type='submit' disabled={loading}>가입하기</button>
    </StRegisterBox>
  );
}

export default RegisterForm;

const StRegisterBox = styled.form`
  .registerBox {
    width: 100%;
    margin-bottom: 100px;
    position: relative;
    span {
      color: #fff;
      padding: 5px 10px;
      margin-right: 30px;
      transition: all 0.4s;
      /* :hover {
        border-bottom: 2px solid rgba(225, 225, 225, 0.8);
      } */
    }
  }
  .inputbox {
    margin-bottom: 38px;
  }
  p {
    color: #aeabab;
    margin-bottom: 0;
  }
  input {
    color: #fff;
    width: 100%;
    border: none;
    outline: none;
    height: 40px;
    font-size: 20px;
    border-bottom: 1px solid rgba(225, 225, 225, 0.8);
    background: none;
  }
  button {
    font-size: 22px;
    color: #fff;
    margin-top: 50px;
    width: 100%;
    height: 60px;
    background-color: #bf294c;
    border: none;
    outline: none;
    border-radius: 10px;
  }
`;
