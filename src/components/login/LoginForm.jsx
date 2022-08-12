function LoginPage() {
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
            <div
            >아이디</div>
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
        
        <button
        style={{
            width: "300px",
            height: "50px"
        }}
        >로그인</button>
        <button
        style={{
            width: "300px",
            height: "50px"
        }}>회원가입</button>
  
      </div>
    );
  }
  
  export default LoginPage;
  