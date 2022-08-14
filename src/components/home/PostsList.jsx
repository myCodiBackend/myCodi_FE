import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {__getPostList} from "../../redux/modules/postSlice";
const PostsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPostList());
  }, []);


  const posts = useSelector((state)=>state.posts.data);


  return (
    <StPostsList>
      <div className="postWrap">
      {posts.map((post) => {
          return (
            <div
            key={post.id}
            onClick={() => navigate("/detail/"+post.id)}
            >
              <PostCard 
              post={post}
              />
        
            </div>
          );
        })}
      
      
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
