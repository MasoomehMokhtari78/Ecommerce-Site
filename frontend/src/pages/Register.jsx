import React, { useCallback, useState } from 'react'
import styled from "styled-components";
// import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../redux/api';
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const MessageBox = styled.div`

`;

const ErrorMessage = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.2);
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(0, 255, 0, 0.2);
`;

const StyledCheck  = styled(CheckCircleOutlineIcon)`
    color: green;
    padding: 2px;
`;

const StyledError  = styled(ErrorOutlineIcon)`
    color: red;
    padding: 2px;
`;




export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()
  // const dispatch = useDispatch();
  // const {isFetching, error} = useSelector((state) => state.user) 

  
  const handleRegister = useCallback(
    async  (e) => {
      e.preventDefault();
      // register(dispatch, {username, email, password})
      try {
        const res = await publicRequest.post('/register', {username, email, password});
        if (res.data === "This username is already taken.") {
          setMessage(res.data)
          setStatus('fail')
        } else {
          setMessage("your registration has been successful!")
          setStatus('success')
          setTimeout(() => navigate("/login"), 2000);
        }
    } catch (error) {
        console.log(error)
    }
    },
    [username, password, email]
  )

  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                {/* {message && 
                  <MessageWrapper>
                    {success ? 
                    <StyledCheck></StyledCheck> <SuccessMessage></SuccessMessage>
                    : <StyledError></StyledError>}{message}
                  </MessageWrapper> 
                } */}
                {status === 'success' && 
                  <SuccessMessage>
                    <StyledCheck></StyledCheck>
                    {message}
                  </SuccessMessage> }
                {status === 'fail' && 
                <ErrorMessage>
                  <StyledError></StyledError>
                  {message}
                </ErrorMessage> }
                {/* <Input placeholder='name'/> */}
                {/* <Input placeholder='last name'/> */}
                <Input 
                  type="text"
                  placeholder='username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                <Input 
                  type="email"
                  placeholder='email' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                <Input 
                  type="password"
                  placeholder='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                {/* <Input placeholder='confirm password'/> */}
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button
                  onClick={handleRegister}
                >CREATE</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}
