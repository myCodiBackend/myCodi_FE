import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <StHeaderWrap className="header">
      <h1>MY CODY</h1>
      <div className="loginFlexBox">
        <p onClick={() => navigate("/login")}>로그인</p>
        <p>/</p>
        <p onClick={() => navigate("/register")}>회원가입</p>
      </div>
    </StHeaderWrap>
  );
};

export default Header;

const StHeaderWrap = styled.div`
  width: 100%;
  height: 75px;
  background-color: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  h1 {
    margin: 0;
    font-family: "Rubik Marker Hatch", cursive;
    /* font-family: "Roboto Mono", monospace; */
  }
  .loginFlexBox {
    display: flex;
    gap: 7px;
    font-size: 18px;
    font-weight: 700;
    p:hover {
      cursor: pointer;
    }
  }
`;
