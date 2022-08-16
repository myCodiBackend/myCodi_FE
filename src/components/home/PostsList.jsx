import React, { useEffect } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { __getPostList } from "../../redux/modules/postsSlice";

// ----------------------------
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperstyles.css";
import { Pagination } from "swiper";
// --------------------------------
const PostsList = ({ posts }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPostList());
  }, [dispatch]);

  return (
    <StPostsList>
      <div className="postWrap">
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
        {/* {posts.map((post) => {
          return (
            <div
              key={post.id}
              onClick={() => navigate("/detail/" + post.id)}
            >
              <PostCard post={post} />
            </div>
          );
        })} */}
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
