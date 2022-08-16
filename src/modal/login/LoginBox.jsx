import React, { useState } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";

const LoginBox = ({ showModal }) => {
  // 모달 닫는
  const [goRegister, setGoRegister] = useState(false);
  // console.log("goRegister", goRegister);
  //로그인 회원가입 toggle
  const loginToggle = () => {
    setGoRegister(!goRegister);
    // console.log("눌려써요!!!goRegister :", goRegister);
  };
  return (
    <StLoginBox>
      <div className="iconBox">
        <FaWindowClose className="icon" onClick={showModal} />
      </div>
      {goRegister === false ? (
        <LoginForm
          loginToggle={loginToggle}
          goRegister={goRegister}
        ></LoginForm>
      ) : (
        <RegisterForm
          loginToggle={loginToggle}
          goRegister={goRegister}
        ></RegisterForm>
      )}
    </StLoginBox>
  );
};

export default LoginBox;

const StLoginBox = styled.div`
  position: absolute;
  width: 700px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: rgb(225 225 255 / 13%) 0px 6px 15px 7px;
  /* , rgb(0 0 0 / 8%) 0px 0px 0px 1px */
  border-radius: 30px;
  z-index: 6;
  padding: 60px 100px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  .iconBox {
    position: relative;
    width: 100%;
    height: 30px;
    .icon {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      fill: #fff;
    }
  }
`;
