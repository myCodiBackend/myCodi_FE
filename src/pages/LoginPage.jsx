import styled from "styled-components";
import LoginBox from "../modal/login/LoginBox";

function LoginPage({ showModal }) {
  return (
    <StLoginPage className="blur">
      <LoginBox showModal={showModal}></LoginBox>
    </StLoginPage>
  );
}

export default LoginPage;

const StLoginPage = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background-color: #00000099;
  backdrop-filter: blur(5px);
`;
