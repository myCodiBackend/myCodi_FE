import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Wrapper2 } from "../../elements/Wrapper";
import { __getPostList } from "../../redux/modules/postSlice";
import { __getPost, clearPost } from "../../redux/modules/postsSlice";
import axios from "axios";
import { __deletePost, __updatePost } from "../../redux/modules/postSlice";
function DetailPostCard() {
  useEffect(() => {
    dispatch(__getPostList());
    dispatch(__getPost(id));
  }, []);
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState();
  const [updatedContent, setUpdatedContent] = useState();
  const [updatedImg, setUpdatedImg] = useState();

  const [updatedPost, setUpdatedPost] = useState();

  const todo_list = useSelector((state) => state.posts.data);

  const todo = todo_list.find((cur) => cur.id == id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title } = useSelector((state) => state.post.data);
  const { content } = useSelector((state) => state.post.data);
  const { imgUrl } = useSelector((state) => state.post.data);
  const [uploadFile, setUploadFile] = useState();

  const onChangeImg = async (event) => {
    const file = event.target.files[0];

    setUploadFile(file);
    const formData = new FormData();
    formData.append("files", uploadFile);

    await axios({
      method: "post",
      url: "http://localhost:5001/images",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getPost(id));
  };

  useEffect(() => {
    setUpdatedTitle(title);
    setUpdatedContent(content);
    setUpdatedImg(imgUrl);
  }, [title, content, imgUrl]);

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearPost());
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updatePost({
        id: id,
        title: updatedTitle,
        content: updatedContent,
        imgUrl: "",
        author: "",
      })
    );
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

  return (
    <div>
      {isEdit ? (
        <Wrapper2>
          <div style={{ display: "flex" }}>
            <input
              style={{ width: "600px" }}
              value={updatedTitle}
              onChange={(event) => {
                setUpdatedTitle(event.target.value);
              }}
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            <input
              className="imageInputBox"
              type="file"
              accept="image/*"
              onChange={onChangeImg}
              style={{
                height: "300px",
                width: "300px",
                border: "1px solid",
              }}
            />
            <input
              className="contentInputbox"
              style={{
                height: "300px",
                width: "300px",
                border: "1px solid",
                marginLeft: "20px",
              }}
              value={updatedContent}
              onChange={(event) => {
                setUpdatedContent(event.target.value);
              }}
            />
          </div>
          <div style={{ float: "right" }}>
            <button
              onClick={onCancelButtonHandler}
              style={{
                marginRight: "10px",
              }}
            >
              취소
            </button>
            <button onClick={onUpdateButtonHandler}>저장</button>
          </div>
        </Wrapper2>
      ) : (
        <Wrapper2>
          <div style={{ display: "flex" }}>
            <div style={{ width: "600px" }}>제목: {todo.title}</div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="imagebox"
              style={{
                height: "300px",
                width: "300px",
                border: "1px solid",
                backgroundImage: `url(${todo.imgUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
               
            </div>

            <div
              className="contentbox"
              style={{
                height: "300px",
                width: "300px",
                border: "1px solid",
                marginLeft: "20px",
              }}
            >
              내용 : {todo.content}
            </div>
          </div>
          <div style={{ float: "right" }}>
            <button
              style={{
                marginRight: "10px",
              }}
              onClick={onChangeEditButtonHandler}
            >
              수정
            </button>
            <button onClick={onDeleteButtonHandler}>삭제</button>
          </div>
        </Wrapper2>
      )}
    </div>
  );
}

export default DetailPostCard;
