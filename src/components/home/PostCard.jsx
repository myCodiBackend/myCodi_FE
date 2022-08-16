import React from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
// import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <StPostCard className="item" onClick={() => navigate(`detail/${post.id}`)}>
      <div className="itembox">
        <div className="img" style={{ backgroundImage: `url(${post.imgUrl})` }}>
          <FiHeart className="icon" />
          {/* <div className="number">51</div> */}
        </div>
        <div className="title">
          <span>{post.title}</span>
        </div>
      </div>
    </StPostCard>
  );
};

const StPostCard = styled.div`
  text-align: center;
  display: flex;
  transition: all 0.5s;
  margin-right: 5px;
  .itembox {
    width: 300px;
    height: 310px;
    color: #90b4ce;
    .img {
      width: 100%;
      height: 260px;
      background-color: #f6f4f5;
      box-sizing: border-box;
      position: relative;
      border-radius: 15px 15px 0 0;
      background-position: center;
      background-size: cover;
      .number {
        position: absolute;
        top: 20px;
        right: 20px;
        color: #ddd;
      }
      .icon {
        opacity: 0.3;
        font-size: 24px;
        transition: all 0.5s;
        cursor: pointer;
        position: absolute;
        top: 30px;
        right: 40px;
        fill: none;
        stroke: #000;
      }
      .icon:hover {
        opacity: 1;
        font-size: 35px;
        fill: red;
      }
    }
    .title {
      padding: 0 12px;
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border-top: none;
      box-sizing: border-box;
      background-color: #fff;
      opacity: 0.7;
      border-radius: 0 0 15px 15px;
      line-height: 50px;
      font-weight: 700;
      transition: all 0.5s;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      :hover {
        font-size: 21px;
      }
    }
    &:hover {
      font-size: 22px;
      text-decoration: underline;
      color: #094067;
    }
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export default PostCard;
