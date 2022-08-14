import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { __getPostList } from "../../redux/modules/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const PostsList = () => {
  const navigate = useNavigate();
  const cards = useSelector((state) => state.postSlice.card);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getPostList());
  }, []);

  // console.log(cards);
  return (
    <StPostsList>
      <div className="postWrap">
        {cards.length === 0 ? (
          <p>목록이 없어요.</p>
        ) : (
          cards.map((card) => {
            return <PostCard key={card.id} card={card} />;
          })
        )}
        {/* <PostCard onClick={() => navigate("/detail")} /> */}
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
