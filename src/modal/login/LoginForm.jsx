import styled from "styled-components";

function LoginPage({ loginToggle, goRegister }) {
  return (
    <StLoginBox className="login">
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
        <input type="text" />
      </div>
      <div className="inputbox">
        <p>비밀번호</p>
        <input type="password" />
      </div>
      <button>로그인</button>
    </StLoginBox>
  );
}

export default LoginPage;

const StLoginBox = styled.form`
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
