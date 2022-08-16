import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { __getCommnetsByTodoId } from '../../redux/modules/commentsSlice';

import Comment from "./Comment";
import Pagination from "./Pagination";


function CommentsList() {
  //페이지네이션
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


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
            {data.slice(offset, offset + limit).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <footer>
            <Pagination
              total={data.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </footer>
      </div>
    );
  }
  
  export default CommentsList;