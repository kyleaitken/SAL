import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { attemptLogin } from '../api/authApi'; 
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const { dispatch } = useAuth();
    const navigate  = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        const loginResponse = await attemptLogin(email, password);
        
        // If login is successful, update the context state
        if (loginResponse) {
            console.log('login response from API: ', loginResponse)
            dispatch({
              type: 'LOGIN',
              payload: loginResponse
            });
            if (loginResponse.type = "Member") {
                navigate('/member'); 
            }
        }
    };

    return (
        <LoginContainer>
            <h1>Login</h1>
                <FormView onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <h2>New to SAL?</h2>
                    <button type="button">Register</button> {/* Placeholder for now */}
                </FormView>
        </LoginContainer>
    );
}

export default LoginScreen;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  input {
    margin: 10px 0;
    padding: 8px;
    width: 400px;
  }

  button {
    margin: 10px 5px;
    padding: 8px 16px;
    width: 150px;
    align-self: center;
  }

  h2 {
    margin-top: 100px;
    align-self:center;
  }
`;

const FormView = styled.form`
  display: flex;
  flex-direction: column;
`