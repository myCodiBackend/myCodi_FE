import React from "react";
// import GlobalLayout from "../../global/GlobalLayout";
import styled from "styled-components";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const Addform = () => {
  return (
    <FormWrap>
      <label>작성자</label>
      <input type="text" />
      {/* img넣을 것 추후 수정 심채운 */}
      {/* <img></img> */}
      <label>이미지</label>
      <div className="img"></div>
      <label>내용</label>
      <input type="textarea" />
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
