import React, {useState} from 'react';
import { loginUser } from '../api'

const Login = ({setToken, navigate}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const verifyPassword = () => {
        console.log ('username: ',username, 'password: ', password)
        if (password === confirmPassword) {
            handleSubmit();
        } else {
            alert('Passwords do not match, please try again.')
        }
    }

    const handleSubmit = async () => {
        console.log ('username: ',username, 'password: ', password)
        const results = await loginUser(username, password);
        
        console.log('results: ', results)
        if (results.token) {
            setToken(results.token);
            window.localStorage.setItem('token', results.token);
            navigate('/');
        } else {
            alert('Trouble logging in, please try again.')
        }
    }

  return (
      <form 
        onSubmit={(event) => {
            event.preventDefault();
            verifyPassword();
        }}>
            <input 
                type='text'
                placeholder='Enter username'
                onChange={(event) => setUsername(event.target.value)}>
            </input>
            <input 
                type='text'
                placeholder='Enter password'
                onChange={(event) => setPassword(event.target.value)}>
            </input>
            <input 
                type='text'
                placeholder='Confirm password'
                onChange={(event) => setConfirmPassword(event.target.value)}>
            </input>
            <button type='submit'>Login</button>
        </form>
  );
};

export default Login;