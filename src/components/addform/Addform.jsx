
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// import GlobalLayout from "../../global/GlobalLayout";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import {  useNavigate } from 'react-router-dom';
import { __addPost } from '../../redux/modules/postSlice';



const Addform = () => {
  const userToken = localStorage.getItem('userToken')
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img,setImg] = useState('')

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
 
  

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onAddPosttButtonHandler = () => {

    const formdata = new FormData();
    formdata.append('imgUrl', img[0]);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
        'Authentication': userToken

      },
    };

    axios.post('/mycodi/images', formdata, config);

    dispatch(
      __addPost({
        title: title,
        imgUrl: imageSrc,
        content: content,
      })
    );
    setTitle("");
    setContent("");
    navigate("/")
  };



  const [imageSrc, setImageSrc] = useState('');         
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
console.log(imageSrc)

  return (
    <FormWrap>
      
      <label>제목</label>
      <input type="text" value={title} onChange={onChangeTitle}/>
      <label>이미지</label>
      <input type="file" onChange={(e) => {
        encodeFileToBase64(e.target.files[0]);
      }} />
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>

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
  margin: 0 auto;
  width: 90%;
  border: 1px solid;
  padding: 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  label {
    background-color: pink;
    border-bottom: 2px solid rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 40px;
    font-size: 25px;
    font-weight: 700;
  }
  input {
    width: 100%;
    height: 40px;
    padding: 7px;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 20px;
    outline: none;
    font-weight: 700;
  }
  .img {
    width: auto;
    height: auto;
    background-color: rosybrown;
    margin: 0 auto;
  }
  textarea {
    width: 800px;
    height: 80px;
    border-radius: 10px;
    font-size: 20px;
    outline: none;
    font-weight: 700;
    margin: 0 auto;
  }
  button {
    height: 40px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
  }
  .icon {
    font-size: 40px;
    fill: royalblue;
    margin: 0 auto;
    transition: all 0.4s;
    :hover {
      transform: scale(1.2);
      /* fill: red; */
      /* border: 1px solid; */
      /* stroke-width: 1px; */
    }
  }
`;
