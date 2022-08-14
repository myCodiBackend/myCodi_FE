import React from "react";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";

// const PostCard = ({ card }) => {

//   // const { id } = useParams();

//   // useEffect(() => {});
// }

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  console.log(post.imgUrl);
  const navigate = useNavigate();

  return (
    <StPostCard className="item" onClick={() => navigate(`detail/${card.id}`)}>
      <div className="itembox">
        <div className="img">
          <img src={post.imgUrl} alt="이미지" />
          <FiHeart className="icon" />
        </div>
        <div className="title">
          <div>{post.title}</div>
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
    .img {
      width: 100%;
      height: 88%;
      background-color: #f6f4f5;
      border: 1px solid;
      box-sizing: border-box;
      position: relative;
      border-radius: 15px 15px 0 0;
      /* background: url(); */
      /* ${(url) => {
        return css`
          background: url(url);
        `;
      }} */
      background-position: center;
      background-size: cover;
      .icon {
        opacity: 0.3;
        font-size: 24px;
        transition: all 0.5s;
        cursor: pointer;
        position: absolute;
        top: 30px;
        right: 40px;
        fill: none;
      }
      .icon:hover {
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

export default PostCard;
