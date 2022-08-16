import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { __getCommnetsByPostId } from '../../redux/modules/commentsSlice';

import Comment from "./Comment";
import Pagination from "./Pagination";


function CommentsList() {
  //페이지네이션
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  const { id } = useParams();
  const dispatch = useDispatch();


const { data } = useSelector((state) => state.comments.commentsByPostId);
useEffect(() => {
  dispatch(__getCommnetsByPostId(id));
 
  // return () => dispatch(__getCommnetsByPostId('a'));
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