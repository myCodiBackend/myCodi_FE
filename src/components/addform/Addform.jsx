import React, { useState } from "react";
// import GlobalLayout from "../../global/GlobalLayout";
import styled from "styled-components";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Addform = () => {
  const navigate = useNavigate();

  // const [desc, setDesc] = useState("")
  const goBack = () => {
    navigate(-1);
  };

  // const onChange = (e)=>{
  //   setDesc(e.target.value)
  // }

  return (
    <FormWrap>
      <label>작성자</label>
      <input type="text" placeholder="작성자" />
      {/* img넣을 것 추후 수정 심채운 */}
      {/* <img></img> */}
      <input type="file" />
      <div className="img"></div>
      <label>내용</label>
      <textarea placeholder="내용을 적어주세요"></textarea>
      <button>등록하기</button>
      <BsArrowLeftCircleFill className="icon" onClick={goBack} />
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
    width: 50%;
    height: 350px;
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
