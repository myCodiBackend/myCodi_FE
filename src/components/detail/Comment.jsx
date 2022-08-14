import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import TextField from "@mui/material/TextField";

import Button from "../../elements/Button";
import {
  __deleteComment,
  __updateComment,
} from "../../redux/modules/commentsSlice";
import {
  clearComment,
  __getComment,
} from "../../redux/modules/commentSlice";
import { Wrapper } from "../../elements/Wrapper";

const Comment = ({ comment }) => {
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
       author: comment.author,
        todoId: Number(id),
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
  }, [content]);

  return (
    <div>
      {isEdit ? (
        <Wrapper>
          <p>작성자 : {comment.author}</p>

          <TextField id="outlined-basic" label="내용" variant="outlined" 
           type="text"
            value={updatedComment}
            onChange={(event) => {
              setUpdatedComment(event.target.value);
            }}
          

          />
          <ButtonSet>
            <Button
              onClick={onCancelButtonHandler}
              style={{
                marginRight: "10px",
              }}
            >
              <p>취소</p>
            </Button>
            <Button onClick={onUpdateButtonHandler}>
              <p>저장</p>
            </Button>
          </ButtonSet>
        </Wrapper>
      ) : (
        <>
          <Wrapper>
            <p>작성자 : {comment.author}</p>
            <p>내용 : {comment.content}</p>
            <p>{comment.modifiedAt}</p>

            <ButtonSet>

              <Button
              style={{marginRight:"10px"}}
                onClick={onChangeEditButtonHandler}
              >수정</Button>
              <Button
                onClick={onDeleteButtonHandler}
              >삭제</Button>

            </ButtonSet>
          </Wrapper>
        </>
      )}
    </div>
  );
};

export default Comment;

const ButtonSet = styled.div`
  float: right;
`;
