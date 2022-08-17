import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// import GlobalLayout from "../../global/GlobalLayout";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { __addPost } from "../../redux/modules/postsSlice";

const Addform = () => {
  const userToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [uploadFile, setUploadFile] = useState();

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onAddPosttButtonHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imgUrl", uploadFile);
    formData.append("title", title);
    formData.append("content", content);

    // await axios({
    //   method: 'post',
    //   url: '/api/files/images',
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authentication': userToken
    //   },
    // });
    console.log(formData);
    dispatch(__addPost(formData));
    setTitle("");
    setContent("");
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  const [fileImage, setFileImage] = useState("");

  const showFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const onChangeImg = (e) => {
    e.preventDefault();

    if (e.target.files) {
      setUploadFile(e.target.files[0]);
    }
  };
  console.log(uploadFile);
  //위 두 함수 중 골라서 고민해봐야됨

  //이미지 미리보기
  //   const [imageSrc, setImageSrc] = useState('');
  //   const encodeFileToBase64 = (fileBlob) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(fileBlob);
  //     return new Promise((resolve) => {
  //       reader.onload = () => {
  //         setImageSrc(reader.result);
  //         resolve();
  //       };
  //     });
  //   };
  // console.log(imageSrc)

  return (
    <FormWrap onSubmit={onAddPosttButtonHandler}>
      <label>제목</label>
      <input
        type="text"
        value={title}
        onChange={onChangeTitle}
        placeholder="제목을 작성해주세요."
      />
      <label>이미지</label>

      <input
        type="file"
        name="imgUpload"
        className="imginput"
        accept="image/*" // accept속성은 서버로 업로드할 수 있는 파일의 타입을 명시, input type="file" 에서만 사용가능
        // onChange={showFileImage}
        onChange={onChangeImg}
      />
      <img className="img" alt="" src={fileImage}></img>

      <label>내용</label>
      <input
        type="textarea"
        placeholder="내용을 작성해주세요."
        value={content}
        onChange={onChangeContent}
      />
      <button>게시하기</button>
      <BsArrowLeftCircleFill className="icon" onClick={goBack} />
    </FormWrap>
  );
};

export default Addform;

const FormWrap = styled.form`
  margin: 0 auto;
  margin-top: 40px;
  width: 90%;
  padding: 20px 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
  background-color: #90b4ce;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: #d8eefe;
  label {
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.7); */
    width: 100%;
    height: 40px;
    font-size: 25px;
    font-weight: 700;
    color: #fff;
  }
  input {
    width: 100%;
    margin: 0 auto;
    height: 40px;
    padding: 7px;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 20px;
    outline: none;
    font-weight: 700;
    border: 1px solid #094067;
    border: none;
  }
  .imginput {
    height: 50px;
  }
  .img {
    width: 300px;
    height: 310px;
    background-color: #fff;
    border: none;
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
    height: 60px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    transition: all 0.4s;
    border: none;
    background-color: #3da9fc;
    color: #fff;
    margin: 10px 0;
  }
  .icon {
    font-size: 40px;
    fill: #fff;
    margin: 0 auto;
    transition: all 0.4s;
    :hover {
      transform: scale(1.2);
      fill: #ef4565;
    }
  }
`;
