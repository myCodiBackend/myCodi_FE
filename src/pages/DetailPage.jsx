import AddCommentForm from "../components/detail/AddCommentForm";
import CommentsList from "../components/detail/CommentsList";
import DetailPostCard from "../components/detail/DetailPostCard";




function DetailPage() {


    return (
      <div>
        <DetailPostCard/>
        <AddCommentForm/>
        <CommentsList/>
        
      </div>
    );
  }
  
  export default DetailPage;
  