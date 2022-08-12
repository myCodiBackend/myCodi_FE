import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostsList = () => {
  const navigate = useNavigate();
  return (
    <StPostsList>
      <div className="postWrap">
        <PostCard onClick={() => navigate("/detail")} />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </StPostsList>
  );
};

export default PostsList;

const StPostsList = styled.div`
  /* background-color: powderblue; */
  .postWrap {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    gap: 80px;
    /* background-color: pink; */
  }
`;
