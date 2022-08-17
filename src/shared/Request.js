import axios from "axios";


// 인스턴스 : 사례
const instance = axios.create({
  baseURL: "http://13.125.217.64" // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

let user_token = localStorage.getItem("Authorization");
// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
instance.defaults.headers.common["Authorization"] = 'Bearer ' + user_token;

export default instance;