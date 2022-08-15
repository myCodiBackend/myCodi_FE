import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <div>
      <figure>{userInfo?.username.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.username}!</strong>
        여기는 프로필 페이지입니다.  
      </span>
    </div>
  )
}
export default ProfilePage;