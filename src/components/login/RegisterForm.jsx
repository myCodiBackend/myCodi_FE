import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../Error';
import { registerUser } from '../../redux/modules/userActions';


import Input from '../../elements/Input';
import Button from '../../elements/Button';

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile')
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.username = data.username.toLowerCase()

    dispatch(registerUser(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      
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
      <div className='form-group'>
        <label htmlFor='email'>Confirm Password</label>
        <Input
          type='password'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      <Button type='submit' className='button' disabled={loading}>
        Register
      </Button>
    </form>
  )
}

export default RegisterScreen