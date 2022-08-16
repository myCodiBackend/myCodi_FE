import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { __getCommnetsByTodoId } from "../../redux/modules/commentsSlice";

import Comment from "./Comment";
import styled from "styled-components";

function CommentsList() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.comments.commentsByTodoId);
  useEffect(() => {
    dispatch(__getCommnetsByTodoId(id));
    return () => dispatch(__getCommnetsByTodoId("a"));
  }, []);

  return (
    <StCommentsList className="StCommentsList">
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </StCommentsList>
  );
}

export default CommentsList;

const StCommentsList = styled.div``;
