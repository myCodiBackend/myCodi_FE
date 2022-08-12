import React from "react";
import styled from "styled-components";
// import PostCard from "../components/home/PostCard";
import PostsList from "../components/home/PostsList";
import GlobalLayout from "../global/GlobalLayout";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <GlobalLayout>
      <StContainer>
        <h1>NEW</h1>
        <PostsList />
      </StContainer>
      <Btn onClick={() => navigate("/add")}>내꺼 등록하기</Btn>
      <StContainer>
        <h1>HOT</h1>
        <PostsList />
      </StContainer>
    </GlobalLayout>
  );
};

export default HomePage;

const StContainer = styled.div`
  width: 100%;
  position: relative;
  h1 {
    box-shadow: 0 0 0;
  }
`;

const Btn = styled.button`
  position: absolute;
  top: 10px;
  right: 30px;
  width: 150px;
  height: 50px;
  padding: 10px 20px;
`;

// const StRank = styled.div`
//   width: 100%;
//   height: 45%;
// `;

// const StHot = styled.div`
//   /* background-color: peru; */
//   width: 100%;
//   height: 45%;
// `;
