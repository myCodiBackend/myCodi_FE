import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { __getCommnetsByPostId } from '../../redux/modules/commentsSlice';

import Comment from "./Comment";
import Pagination from "./Pagination";
import styled from "styled-components";


function CommentsList() {
  //페이지네이션
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getCommnetsByPostId(id));
   
    // return () => dispatch(__getCommnetsByPostId('a'));
  }, []);


const commentList = useSelector((state) => state.comments.commentsByPostId.data);
console.log(commentList)



    return (
      <StCommentsList className="StCommentsList">
            {commentList.slice(offset, offset + limit).map((comment,i) => (
            <Comment key={i} comment={comment} />
          ))}
          <footer>
            <Pagination
              total={commentList.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </footer>
          </StCommentsList>
    );
  }
  
  export default CommentsList;

const StCommentsList = styled.div``;

