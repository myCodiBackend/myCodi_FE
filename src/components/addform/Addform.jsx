import React, { useState } from 'react';
// import GlobalLayout from "../../global/GlobalLayout";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';
import { __addPost } from '../../redux/modules/postSlice';



const Addform = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onAddPosttButtonHandler = () => {
    dispatch(
      __addPost({
        title: title,
        content: content,
      })
    );
    setTitle("");
    setContent("");
    navigate("/")
  };



  return (
    <FormWrap>
      
      <label>제목</label>
      <input type="text" value={title} onChange={onChangeTitle}/>
      <label>이미지</label>
      <input type='file'/>
      <div className="img"></div>
      <label>내용</label>
      <input type="textarea" value={content} onChange={onChangeContent}/>
      <button
        onClick={onAddPosttButtonHandler
        }
      >
        게시하기
      </button>
      <BsArrowLeftCircleFill />
    </FormWrap>
  );
};

export default Addform;

const FormWrap = styled.form`
  width: 90%;
  height: 70vh;
  background-color: #bfa8bc;
  /* opacity: 0.4; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
