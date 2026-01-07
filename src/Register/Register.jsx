import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/authenticateSlice';
import TextField from '@mui/material/TextField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



function Register () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const users =useSelector((state)=>state.authenticator.users)
   console.log(users)

   const RegistrationSchema = z.object({
  username: z.string().min(1, { message: 'Must have at least 1 character' }),
  email: z
    // .min(11, { message: 'should be a valid email' })
    .email({
      message: 'Must be a valid email',
    }),

  password: z
    .string()
    .min(1, { message: 'Must have at least 1 character' })

    })
  
    


  const handleRegister = async (e) => {
    const user={
      email:email,
      password:password
    }
    e.preventDefault();
    console.log('registering in with:', { email, password });
    dispatch(addUser({ email:email, password:password }));
    navigate('/dashboard');
    localStorage.setItem("current-user", JSON.stringify(user));
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationSchema),
  });

  return (
    <form onSubmit={handleSubmit(handleRegister)}>

    <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div><TextField  variant="outlined"   placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required />
        {errors.email && <p>{errors.email.message}</p>}
        </div>
          
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <div><TextField type="password" variant="outlined"   placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required/>
        {errors.password && <p>{errors.password.message}</p>}
          </div>
        )}
        name="password"
      />

      <button type="submit" onClick={handleRegister}>Register</button>

    </form>
  );
};

export default Register;



