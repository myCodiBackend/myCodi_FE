import React from "react";
import styled from "styled-components";
// import PostCard from "../components/home/PostCard";
import PostsList from "../components/home/PostsList";
import GlobalLayout from "../global/GlobalLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return (
    <GlobalLayout>
      <StContainer>
        <h1>NEW</h1>
        <PostsList posts={posts} />
      </StContainer>
      <hr style={{ borderColor: "#094067" }} />
      <StContainer>
        <h1>HOT</h1>
        {/* <PostsList /> */}
      </StContainer>
    </GlobalLayout>
  );
};

export default HomePage;

const StContainer = styled.div`
  width: 100%;
  /* background-color: #fff; */
  color: #094067;
`;
