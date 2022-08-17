import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/modules/userActions';
import { useEffect } from 'react';
import Error from "../../components/Error";

function LoginPage({ loginToggle, goRegister }) {
  const { loading, userInfo, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }



  return (
    <StLoginFormBox className="login" onSubmit={handleSubmit(submitForm)}>
         {error && <Error>{error}</Error>}
      <div className="signBox">
        {goRegister === false ? (
          <span
            className="login"
            style={{ borderBottom: "2px solid rgba(225, 225, 225, 0.8)" }}
          >
            로그인
          </span>
        ) : (
          <span className="login">로그인</span>
        )}
        <span className="register" onClick={loginToggle}>
          회원가입
        </span>
      </div>
      <div className="inputbox">
        <p>아이디</p>
        <input 
          type="text"
          {...register('username')}
          required
          />
      </div>
      <div className="inputbox">
        <p>비밀번호</p>
        <input type="password"
         {...register('password')}
         required
        />
      </div>
      <button type='submit' disabled={loading}>로그인</button>
    </StLoginFormBox>
  );
}

export default LoginPage;

const StLoginFormBox = styled.form`
  .signBox {
    width: 100%;
    margin-bottom: 100px;
    position: relative;
    span {
      color: #fff;
      padding: 5px 10px;
      margin-right: 30px;
      transition: all 0.4s;
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
    width: 100%;
    height: 60px;
    background-color: #bf294c;
    border: none;
    outline: none;
    border-radius: 10px;
  }
`;
