import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/modules/userActions';
import { useEffect } from 'react';
import Error from '../Error';

import Input from '../../elements/Input';
import Button from '../../elements/Button';

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className='form-group'>
        <label htmlFor='username'>username</label>
        <Input
          type='text'
          className='form-input'
          {...register('username')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <Input
          type='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <Button type='submit' className='button' disabled={loading}>
        Login
      </Button>
    </form>
  )
}

export default LoginScreen