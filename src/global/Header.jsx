import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserDetails } from '../redux/modules/userActions';
import { logout } from '../redux/modules/userSlice';
import styled from "styled-components";


const Header = (props) => {
  const { userInfo, userToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails())
    }
  }, [userToken, dispatch])

  return (
    <StHeaderWrap className="header">
  
       <NavLink to='/'><h1>Mycody</h1></NavLink>
      <div className='header-status'
      style={{float:"right"}}
      >
        <span>
          {userInfo ? `Logged in as ${userInfo.username}` : "You're not logged in"}
        </span>
        <div className='cta'>
          {userInfo ? (
          <div>
                <NavLink to='/user-profile'>Profile</NavLink>
                <button className='button' onClick={() => dispatch(logout())}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <NavLink to='/register'>Register</NavLink>
                <NavLink className='button' to='/login'>
                  Login
                </NavLink>
              </div>

            )}
        </div>
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
