import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { __getCommnetsByTodoId } from '../../redux/modules/commentsSlice';

import Comment from "./Comment";



function CommentsList() {


  const { id } = useParams();
  const dispatch = useDispatch();


const { data } = useSelector((state) => state.comments.commentsByTodoId);
useEffect(() => {
  // if (id) {
  //   axios
  //     .get(`http://localhost:5001/post_data?id=${id}`)
  //     .then((response) => setPost(response.data[0]));
  // }
  dispatch(__getCommnetsByTodoId(id));
 
  return () => dispatch(__getCommnetsByTodoId('a'));
}, []);


    return (
      <div>
            {data.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    );
  }
  
  export default CommentsList;