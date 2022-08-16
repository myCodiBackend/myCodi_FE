import React from "react";
// import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import useInput from "../hooks/useinput";
import { __addComment } from "../../redux/modules/commentsSlice";
import { WrapperForm } from "../../elements/Wrapper";
import styled from "styled-components";
import { FaPlusSquare } from "react-icons/fa";

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm();

  const onAddCommentButtonHandler = (data) => {
    dispatch(
      __addComment({
        todoId: Number(id),

        content: data.content,
      })
    );
    setContent("");
  };

  const [content, setContent, onChangeContentHandler] = useInput();

  return (
    <CommentForm onSubmit={handleSubmit(onAddCommentButtonHandler)}>
      <TextField
        required
        id="outlined-required"
        label="댓글내용"
        placeholder="댓글내용 (100자 이내)"
        aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"}
        {...register("content", {
          required: "내용은 필수 입력사항입니다.",
          maxLength: {
            value: 100,
            message: "100자 이내로  작성해주세요.",
          },
        })}
        value={content}
        name="content"
        type="text"
        onChange={onChangeContentHandler}
      />
      {errors.content && <small role="alert">{errors.content.message}</small>}
      <FaPlusSquare className="icon" type="submit">
        추가하기
      </FaPlusSquare>
    </CommentForm>
  );
};

export default AddCommentForm;

const CommentForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .icon {
    font-size: 30px;
  }
`;
