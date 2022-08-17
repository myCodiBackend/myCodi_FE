
import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import  {logout} from "../redux/modules/userSlice";
import { getUserDetails } from '../redux/modules/userActions';

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.user)
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails())
    }
  }, [userToken, dispatch])

  // 모달
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(!IsModalOpen);
  };
  return (
    <StHeaderWrap className="header">
      <h1 onClick={() => navigate("/")}>MY CODY</h1>
      <button onClick={() => navigate("/add")}>내 거 등록하기</button>
      <div className="loginFlexBox">
      {userInfo ? (<>
          <p>{userInfo.username}</p>
            <p className='sign' onClick={() => dispatch(logout())}>
              로그아웃
            </p></>
          
          ) : (
           <p className="sign" onClick={showModal}>
          로그인 / 회원가입
        </p>
          )}
        
        {IsModalOpen && <LoginPage showModal={showModal} />}

      </div>
 
    </StHeaderWrap>
  );
};

export default Header;

const StHeaderWrap = styled.div`
  position: relative;
  max-width: 1400px;
  min-width: 800px;
  height: 75px;
  margin: 0 auto;
  background-color: #d8eefe;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #094067;
  color: #094067;
  h1 {
    margin: 0;
    font-family: "Rubik Marker Hatch", cursive;
    /* font-family: "Roboto Mono", monospace; */
  }
  button {
    background-color: #d8eefe;
    color: #094067;
    border: none;
    padding: 1.2rem 2rem;
    border-radius: 10px;

    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.4s;
    :hover {
      box-shadow: 0 5px 15px -10px rgb(31 18 53 / 60%);
      background-color: #3da9fc;
      color: #fff;
    }
  }
  .loginFlexBox {
    border-radius: 10px;
    display: flex;
    gap: 7px;
    font-size: 18px;
    font-weight: 700;
    .sign {
      padding: 15px 25px;
      border-radius: 10px;
      transition: all 0.4s;
      :hover {
        cursor: pointer;
        background-color: #3da9fc;
        color: #fff;
      }
    }
  }
`;
