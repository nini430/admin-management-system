import {useNavigate,Link} from 'react-router-dom';
import styled from 'styled-components';
import { Typography, FormControl, Button } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import StyledInput from '../components/Input/Input.styles';

interface IAuthProps {
  isRegister: boolean;
}

const Auth: React.FC<IAuthProps> = ({ isRegister }) => {
  const navigate=useNavigate();
  return (
    <Container>
      <Form>
        <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
         {isRegister? 'Register Form':'Login Form'}
        </Typography>
        <LockClockOutlined sx={{ marginBottom: 2, color: 'lightblue' }} />
        {isRegister && (
          <>
            <FormControl sx={{ marginBottom: 3 }}>
              <StyledInput placeholder="Name" size="medium" fullWidth />
            </FormControl>
            <FormControl sx={{ marginBottom: 3 }}>
              <StyledInput placeholder="Last Name" size="medium" fullWidth />
            </FormControl>
          </>
        )}
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput placeholder="E-mail" size="medium" fullWidth />
        </FormControl>
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
            type="password"
            placeholder="Password"
            size="medium"
            fullWidth
          />
        </FormControl>
        {isRegister && (
          <FormControl sx={{ marginBottom: 3 }}>
            <StyledInput
              type="password"
              placeholder="Repeat password"
              size="medium"
              fullWidth
            />
          </FormControl>
        )}
        <Button sx={{ marginBottom: 3 }} variant="contained">
         {isRegister ? 'Sign Up':'Sign In'}
        </Button>
        <Typography>
         {isRegister?'Already a member?':"Don't have an account?"}<Link to={isRegister?'/login':'/register'}><SignText>{isRegister?'Sign in':'Sign Up'}</SignText></Link>
        </Typography>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  background-color: aliceblue;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightblue;
`;
const SignText = styled.span`
  color: #76c0e5;
  font-weight: 700;
  text-decoration: underline;
`;

export default Auth;
