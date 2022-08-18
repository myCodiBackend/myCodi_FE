import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../hooks/useinput";
// import { Wrapper2 } from "../../elements/Wrapper";
import { __getPostList, __likePost } from "../../redux/modules/postsSlice";
import { __getPost, clearPost } from "../../redux/modules/postSlice";
// import axios from "axios";
import { __deletePost, __updatePost } from "../../redux/modules/postsSlice";
import axios from "axios";
import styled, { css } from "styled-components";
import {
  FaEdit,
  FaTrashAlt,
  FaCommentAlt,
  FaWindowClose,
} from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { GoX } from "react-icons/go";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import { __getCommnetsByPostId } from "../../redux/modules/commentsSlice";

function DetailPostCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(__getPostList());
    dispatch(__getPost(id));
  }, []);

  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedImg, setUpdatedImg] = useState();
  const [prevImg, setPrevImg] = useState();

  // const postList = useSelector((state) => state.posts.data);

  // const post = postList.find((cur) => cur.id == id);
  // console.log(post);

  const userInfo = localStorage.getItem("userInfo");
  const data = useSelector((state) => state.post.data);
  console.log(data);
  // const { title } = useSelector((state) => state.post.data);
  // const { content } = useSelector((state) => state.post.data);
  // const { imageUrl } = useSelector((state) => state.post.data);

  const onChangeImg = (e) => {
    setUpdatedImg(e.target.files[0]);
    setPrevImg(URL.createObjectURL(e.target.files[0]));
  };

  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getPost(id));
  };

  useEffect(() => {
    setUpdatedTitle(data.title);
    setUpdatedContent(data.content);
    setUpdatedImg(data.imageUrl);
  }, [data]);

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearPost());
  };

  const onUpdateButtonHandler = async () => {
    let req = {
      title: updatedTitle,
      content: updatedContent,
    };
    let json = JSON.stringify(req);
    const updateform = new FormData();

    const utitleblob = new Blob([json], { type: "application/json" });
    updateform.append("title", utitleblob);
    const ucontentblob = new Blob([json], { type: "application/json" });
    updateform.append("content", ucontentblob);
    updateform.append("imageUrl", updatedImg);

    dispatch(__updatePost({ updateform, id }));
    // setUpdatedTitle("");
    // setUpdatedContent("");
    // setUpdatedImg("")
    setIsEdit(false);
  };

  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deletePost(id));
      navigate("/");
    } else {
      return;
    }
  };

  const onLikeButtonHamdler = () => {
    dispatch(__likePost(id));
  };

  const [commentUp, setCommentUp] = useState(false);
  const onToggle = () => {
    setCommentUp(!commentUp);
    dispatch(__getCommnetsByPostId(id));
  };

  // const [updatedtitle,setUpdated]

  return (
    <StDetailPostCard id="form" className="postcard">
      {isEdit ? (
        <Wrap>
          <div className="edittitle">
            <p>제목 수정</p>

            <input
              name="title"
              value={updatedTitle}
              className="editinput"
              onChange={(event) => {
                setUpdatedTitle(event.target.value);
              }}
            ></input>
          </div>

          <p>사진 수정</p>
          <div className="editimgbox">
            <input
              name="imageUrl"
              className="imageInputBox"
              type="file"
              accept="image/*"
              onChange={onChangeImg}
            />
            <div className="imgbox">
              <img className="img" src={prevImg} alt="" />
            </div>
          </div>

          <p>내용 수정</p>
          <div>
            <input
              name="content"
              className="contentInputbox"
              value={updatedContent}
              onChange={(event) => {
                setUpdatedContent(event.target.value);
              }}
            />
          </div>

          <div className="editiconbox">
            <GoX className="icon" onClick={onCancelButtonHandler}></GoX>
            <BiDownload
              className="icon"
              onClick={onUpdateButtonHandler}
            ></BiDownload>
          </div>
        </Wrap>
      ) : (
        <Wrap className="wrap">
          <div className="title">
            <span>{data.title}</span>
            <button onClick={onLikeButtonHamdler}>좋아요</button>
            <div className="iconbox">
              <FaEdit
                className="editButton"
                onClick={onChangeEditButtonHandler}
              ></FaEdit>
              <FaTrashAlt
                className="deleteButton"
                onClick={onDeleteButtonHandler}
              ></FaTrashAlt>

              <FaCommentAlt
                className="commentbutton"
                onClick={onToggle}
              ></FaCommentAlt>
            </div>
          </div>

          <div
            className="imagebox"
            style={{
              backgroundImage: `url(${data.imageUrl})`,
            }}
          ></div>

          <div className="descbox">
            <div className="desc">{data.content}</div>
          </div>
        </Wrap>
      )}
      <CommentUpContainer commentUp={commentUp}>
        {/* 댓글 늘리고 줄이는 기능 */}
        <div className="commentToggle" onClick={onToggle}>
          {commentUp === true ? <FaWindowClose className="icon" /> : ""}
        </div>
        <div className="commentUpDetail">
          <AddCommentForm />
          <hr style={{ color: "#094067" }} />
          <CommentsList />
        </div>
      </CommentUpContainer>
    </StDetailPostCard>
  );
}

export default DetailPostCard;

const StDetailPostCard = styled.div`
  font-weight: bold;
  color: #094067;
  max-width: 1400px;
  min-width: 800px;
  margin: 0 auto;
  padding: 24px 24px 40px 24px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  p {
    font-size: 23px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 8px;
  }
`;

const Wrap = styled.form`
  position: relative;
  width: 90%;
  margin: 0 auto;
  padding: 0 30px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding-bottom: 50px;
  overflow: hidden;
  .edittitle {
    width: 100%;
    margin: 20px 0;
    .editinput {
      font-weight: bold;
      border-radius: 15px;
      outline: none;
      border: none;
      font-size: 20px;
      width: 100%;
      height: 80px;
      padding: 0 15px;
      box-sizing: border-box;
    }
  }
  .title {
    height: 100px;
    line-height: 100px;
    font-size: 25px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .iconbox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      gap: 30px;
      .icon {
        transform: scale(1);
        transition: all 0.4s;
        cursor: pointer;
        fill: #ef4565;
      }
      .icon:hover {
        transform: scale(1.3);
      }
    }
  }
  .imagebox {
    margin: 0 auto;
    width: 80%;
    height: 500px;
    border-radius: 12px;
    background-position: center;
    background-size: cover;
    margin-bottom: 20px;
  }
  .descbox {
    width: 100%;
    margin: 0 auto;
    .desc {
      color: #000;
      font-weight: bold;
      padding: 10px 20px;
      box-sizing: border-box;
      font-size: 20px;
      border-radius: 20px;
      background-color: #fff;
      width: 80%;
      height: 80px;
      margin: 0 auto;
    }
  }
  .editimgbox {
    width: 100%;
    .imageInputBox {
      width: 100%;
      font-weight: bold;
      padding: 5px 10px;
      box-sizing: border-box;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .imgbox {
      text-align: center;
      img {
        width: 650px;
        height: 650px;
      }
    }
  }
  .contentInputbox {
    width: 100%;
    height: 100px;
    border: none;
    border-radius: 15px;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .editiconbox {
    margin-top: 25px;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;
    .icon {
      fill: #ef4565;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      border-radius: 12px;
      padding: 5px 10px;
      transform: scale(1);
      transition: all 0.4s;
      cursor: pointer;
    }
    .icon:hover {
      transform: scale(1.3);
    }
  }
`;

const CommentUpContainer = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0px;
  height: 100%;
  background-color: rgba(225, 225, 225, 0.95);
  box-shadow: rgb(225 225 255 / 13%) 0px 6px 15px 7px;
  padding: 0 10px;
  box-sizing: border-box;
  transition: all 0.6s ease-in-out;
  box-sizing: border-box;
  ${({ commentUp }) => {
    // eslint-disable-next-line default-case
    switch (commentUp) {
      case true: {
        return css`
          width: 400px;
          opacity: 1;
        `;
      }
      case false: {
        return css`
          width: 0;
          opacity: 0;
        `;
      }
    }
  }}
  .commentToggle {
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px 0px 15px 12px;
    .icon {
      font-size: 25px;
    }
  }
  .commentUpDetail {
    height: 100%;
  }
`;
