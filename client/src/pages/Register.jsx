import React, { useState , useEffect} from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useNavigate } from 'react-router-dom'
import { Logo, FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
export const Register = () => {
  const [values, setValues] = useState(initialState)
  const {isLoading, showAlert, displayAlert, user, setupUser}= useAppContext()
  const navigate = useNavigate()
const handleChange = (e) => {
  e.preventDefault()
  setValues({...values, [e.target.name]: e.target.value})
}
const onsubmit = (e) => {
  e.preventDefault()
  const {name, email, password, isMember} = values;
   if(!email || !password || (!isMember && !name)){
     displayAlert()
     return
   }
   const currentUser = {name, email, password}
   if(isMember){
     setupUser({
       currentUser,
       endPoint: 'login',
       alertText: 'Login Successful! Redirecting...',
     })
   }else {
    setupUser({
      currentUser,
      endPoint: 'register',
      alertText: 'User Created! Redirecting...',
    })
   }
  
}

useEffect(() => {
   if(user){
     setTimeout(() => {
      navigate('/')
     },3000)
   }
},[user, navigate])
const toggleMember = () => {
  setValues({...values, isMember: !values.isMember})
}
  return (
    <Wrapper className='full-page'>
      <form onSubmit={onsubmit} className="form">
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
           <FormRow 
           type="text"
           value={values.name}
           name='name'
           handleChange={handleChange}
          />
        )
        }
        <FormRow 
           type="email"
           value={values.email}
           name='email'
           handleChange={handleChange}
        />
        <FormRow 
          type="password"
          value={values.password}
          name='password'
           handleChange={handleChange}
        />
        <button type='submit' disabled={isLoading} className="btn btn-block">Submit</button>
         <p>
           {values.isMember ? 'Not a member yet': 'Already a member ?'}
           <button type='button' onClick={toggleMember} 
           className='member-btn'>
             {values.isMember ? ' Register' : 'Login'}
           </button>
         </p>
      </form>
    </Wrapper>
  )
}
