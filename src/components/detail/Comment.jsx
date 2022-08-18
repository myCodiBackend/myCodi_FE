import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";


import {
  __deleteComment,
  __getCommnetsByPostId,
  __updateComment,
} from "../../redux/modules/commentsSlice";
import { clearComment, __getComment } from "../../redux/modules/commentSlice";
// import { Wrapper } from "../../elements/Wrapper";
// import Button from "../../elements/Button";

const Comment = ({ comment }) => {
  const userInfo = localStorage.getItem('userInfo')
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const { content } = useSelector((state) => state.comment.data);

  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        postId: Number(id),
      })
    );
    setIsEdit(false);
  };

  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getComment(comment.id));
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearComment());
  };

  useEffect(() => {
    setUpdatedComment(content);
    // dispatch(__getCommnetsByPostId(id));
    dispatch(__getComment(id));
  }, [content]);

  return (
    <div>
      {isEdit ? (
        <StComment>
          <div className="textbox">
            <p>작성자 : {comment.author}</p>
            <TextField
              id="outlined-basic"
              label="내용"
              variant="outlined"
              type="text"
              value={updatedComment}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </div>

          <div className="buttonbox">
            <button onClick={onCancelButtonHandler}>
              <p>취소</p>
            </button>
            <button onClick={onUpdateButtonHandler}>
              <p>저장</p>
            </button>
          </div>
        </StComment>
      ) : (
        <>
          <StComment>
            <div className="textbox">
              <p>작성자 : {comment.author}</p>
              <p>내용 : {comment.content}</p>
              <p>{comment.modifiedAt}</p>
            </div>
          {userInfo == comment.author? (<>
           <div className="buttonbox">
              <button onClick={onChangeEditButtonHandler}>수정</button>
              <button onClick={onDeleteButtonHandler}>삭제</button>
            </div>
          </>):(
            null)}
           
          </StComment>
        </>
      )}
    </div>
  );
};

export default Comment;

const StComment = styled.div`
  border: 1px solid;
  border-radius: 12px;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  .textbox {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    p {
      margin: 0;
      color: #094067;
      font-size: 16px;
    }
  }
  .buttonbox {
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    button {
      padding: 2px 0;
      background-color: #fff;
      border: none;
      border-radius: 7px;
      font-weight: bold;
      :hover {
        background-color: #3da9fc;
      }
    }
  }
`;
