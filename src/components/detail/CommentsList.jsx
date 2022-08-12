import Comment from "./Comment";



function CommentsList() {
const data= [{
  "todoId": 1,
  "author": "asdas",
  "content": "sdaasdfdsfsf",
  "id": 1
},
{
  "todoId": 1,
  "author": "asdas",
  "content": "sdaasdfdsfsf",
  "id": 1
},
{
  "todoId": 1,
  "author": "asdas",
  "content": "sdaasdfdsfsf",
  "id": 1
},
{
  "todoId": 1,
  "author": "asdas",
  "content": "sdaasdfdsfsf",
  "id": 1
},
{
  "todoId": 1,
  "author": "asdas",
  "content": "sdaasdfdsfsf",
  "id": 1
}]

    return (
      <div>
            {data.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    );
  }
  
  export default CommentsList;