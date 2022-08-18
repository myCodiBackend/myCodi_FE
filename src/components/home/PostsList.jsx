import React, { useEffect } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { __getPostList } from "../../redux/modules/postsSlice";

// ----------------------------
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperstyles.css";
import { Pagination } from "swiper";
// import { __addPost } from "../../redux/modules/postsSlice.js";
// import { useSelector } from "react-redux";
// --------------------------------
const PostsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getPostList());
    dispatch(__getPostList());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.data);

  return (
    <StPostsList>
      <div className="postWrap">
        {posts.length === 0 ? (
          <p>게시글이 없어요.</p>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            modules={[Pagination]}
            className="mySwiper"
          >
            {posts.map((post) => {
              return (
                <SwiperSlide
                  key={post.id}
                  onClick={() => navigate("/detail/" + post.id)}
                >
                  <PostCard post={post} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </StPostsList>
  );
};

export default PostsList;

const StPostsList = styled.div`
  .postWrap {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    gap: 40px;
    margin-bottom: 40px;
  }
`;
