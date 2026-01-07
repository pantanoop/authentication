import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../redux/authenticateSlice';


function Login () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const users =useSelector((state)=>state.authenticator.users)


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('registering in with:', { email, password });
     
        
        let emailFound = users.find((user) => user.email === email);
        let passwordFound = users.find((user) => user.password === password);


        if(emailFound && passwordFound){
              dispatch(login());
              navigate('/dashboard');
        }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      
       <input type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required />
    
        

      <button type="submit">Login</button>

    </form>
  );
};

export default Login;



