import { Wrapper2 } from "../../elements/Wrapper";
import styled from "styled-components";

function DetailPostCard() {


    return (
      <Wrapper2>
         <div
         style= {{display:"flex"}}
         >
          <div
          style={{width:"600px"}}
          >제목: 날씨좋은 날 입기 좋은 옷</div>
          <div    
         style={{float: "right"}} >
            <button
            style={{
              marginRight: "10px",  
             }}  
            >수정</button>
          <button>삭제</button>
          </div>
          
      </div>
      <div
      style={{display:"flex"}}
      >
       <div
       classname= "imagebox"
      style= {{
        height: "300px",
        width: "300px",
        border: "1px solid"
      }}
       >이미지</div>
       <div
       classname= "contentbox"
       style= {{
        height: "300px",
        width: "300px",
        border: "1px solid",
        marginLeft: "20px"}}>
        내용
       </div>

      </div>



      </Wrapper2>
     
    );
  }
  
  export default DetailPostCard;

  const ButtonSet = styled.div`
  float: right;
`;

  