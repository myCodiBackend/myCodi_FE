
function RegisterForm() {
    return (
      <div
      style={{
        border:'1px solid',
        width: "500px",
        height: "500px",
        margin: "auto",
        textAlign: 'center'
      }}>
       <div>
            <div>아이디</div>
        <input
        style={{
            width: "300px",
            height: "50px"
        }}/>
        </div>
        <div>
            <div>비밀번호</div>
        <input
        style={{
            width: "300px",
            height: "50px"
        }}/>
        </div>
        <div>
            <div>비밀번호재확인</div>
        <input
        style={{
            width: "300px",
            height: "50px"
        }}/>
        </div>
        <div>
            <div>닉네임</div>
        <input
        style={{
            width: "300px",
            height: "50px"
        }}/>
        </div>
        
   
        <button
        style={{
            width: "300px",
            height: "50px"
        }}>가입하기</button>
  
      </div>
    );
  }
  
  export default RegisterForm;
  