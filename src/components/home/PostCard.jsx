import React from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";

const PostCard = () => {
  return (
    <StPostCard className="item">
      <div className="itembox">
        <div className="img">
          <div>이미지</div>
          <FiHeart className="icon" />
        </div>
        <div className="title">
          <div>제목</div>
        </div>
      </div>
    </StPostCard>
  );
};

export default PostCard;

const StPostCard = styled.div`
  text-align: center;
  display: flex;
  transition: all 0.5s;
  margin-right: 5px;
  /* border-radius: 5px; */
  .itembox {
    width: 300px;
    height: 310px;
    /* border-radius: 15px; */
    .img {
      width: 100%;
      height: 88%;
      background-color: #f6f4f5;
      border: 1px solid;
      box-sizing: border-box;
      position: relative;
      border-radius: 15px 15px 0 0;
      .icon {
        opacity: 0.5;
        font-size: 24px;
        transition: all 0.5s;
        cursor: pointer;
        position: absolute;
        top: 30px;
        right: 40px;
        fill: none;
      }
      &:hover .icon {
        opacity: 1;
        font-size: 35px;
        fill: red;
      }
    }
    .title {
      width: 100%;
      height: 12%;
      border: 1px solid;
      border-top: none;
      box-sizing: border-box;
      background-color: yellowgreen;
      opacity: 0.7;
      border-radius: 0 0 15px 15px;
      line-height: 37px;
      font-weight: 700;
      transition: all 0.5s;
    }
    &:hover {
      font-size: 21px;
      text-decoration: underline;
    }
  }
  &:hover {
    transform: scale(1.05);
  }
`;
