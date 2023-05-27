import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { Typography, FormControl } from '@mui/material';
import {LoadingButton} from '@mui/lab'
import { LockClockOutlined } from '@mui/icons-material';
import StyledInput from '../components/Input/Input.styles';
import { initialValues, validationSchema } from '../formik-validation/login';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser } from '../store/userSlice';

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const {loginLoading}=useAppSelector(state=>state.userReducer)
  const { values, errors, handleSubmit, getFieldProps, dirty, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
        dispatch(loginUser({input:values,onSuccess:()=>{
          navigate('/');
        }}));
    },
  });
  return (
    <Container>
      <Form>
        <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
          Login Form
        </Typography>
        <LockClockOutlined sx={{ marginBottom: 2, color: 'lightblue' }} />
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput  sx={{border:`1px solid ${(errors.email && touched.email)?'red':'transparent'}`,minWidth:'450px'}}  {...getFieldProps('email')}  placeholder="E-mail" size="medium" fullWidth />
          {errors.email && touched.email && <RedAlertMessage>{errors.email}</RedAlertMessage>}
        </FormControl>
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
          sx={{border:`1px solid ${(errors.password && touched.password)?'red':'transparent'}`,minWidth:'450px'}} 
            type="password"
            placeholder="Password"
            size="medium"
            fullWidth
            {...getFieldProps('password')}
          />
           {errors.password && touched.password && <RedAlertMessage>{errors.password}</RedAlertMessage>}
        </FormControl>
        <LoadingButton onClick={()=>handleSubmit()} loading={loginLoading} fullWidth disabled={Object.keys(errors).length>0 ||  !dirty} sx={{ marginBottom: 3 }} variant="contained">
          Sign In
        </LoadingButton>
        <Typography>
          Don't have an account?
          <Link to="/register">
            <SignText>Sign Up</SignText>
          </Link>
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
  margin-left: 3px;
`;

const RedAlertMessage=styled.span`
  color:red;

`

export default Login;
