import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { Typography, FormControl } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import StyledInput from '../components/Input/Input.styles';
import { initialValues, validationSchema } from '../formik-validation/register';
import { useAppDispatch, useAppSelector } from '../store/store';
import { registerUser } from '../store/userSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const { registerLoading } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { handleSubmit, errors, getFieldProps, dirty, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        registerUser({
          input: values,
          onSuccess: (msg) => {
            toast(msg, { duration: 2000 });
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          },
        })
      );
    },
  });
  return (
    <Container>
      <Form>
        <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
          Register Form
        </Typography>
        <LockClockOutlined sx={{ marginBottom: 2, color: 'lightblue' }} />
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
            sx={{
              border: `1px solid ${
                errors.firstName && touched.firstName ? 'red' : 'transparent'
              }`,
              minWidth: '450px',
            }}
            {...getFieldProps('firstName')}
            placeholder="Name"
            size="medium"
            fullWidth
          />
          {errors.firstName && touched.firstName && (
            <RedAlertMessage>{errors.firstName}</RedAlertMessage>
          )}
        </FormControl>
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
            sx={{
              border: `1px solid ${
                errors.lastName && touched.lastName ? 'red' : 'transparent'
              }`,
              minWidth: '450px',
            }}
            {...getFieldProps('lastName')}
            placeholder="Last Name"
            size="medium"
            fullWidth
          />
          {errors.lastName && touched.lastName && (
            <RedAlertMessage>{errors.lastName}</RedAlertMessage>
          )}
        </FormControl>
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
            sx={{
              border: `1px solid ${
                errors.email && touched.email ? 'red' : 'transparent'
              }`,
              minWidth: '450px',
            }}
            {...getFieldProps('email')}
            placeholder="E-mail"
            size="medium"
            fullWidth
          />
          {errors.email && touched.email && (
            <RedAlertMessage>{errors.email}</RedAlertMessage>
          )}
        </FormControl>
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
            sx={{
              border: `1px solid ${
                errors.password && touched.password ? 'red' : 'transparent'
              }`,
              minWidth: '450px',
            }}
            {...getFieldProps('password')}
            type="password"
            placeholder="Password"
            size="medium"
            fullWidth
          />
          {errors.password && touched.password && (
            <RedAlertMessage>{errors.password}</RedAlertMessage>
          )}
        </FormControl>
        <FormControl sx={{ marginBottom: 3 }}>
          <StyledInput
            sx={{
              border: `1px solid ${
                errors.confirmPassword && touched.confirmPassword
                  ? 'red'
                  : 'transparent'
              }`,
              minWidth: '450px',
            }}
            {...getFieldProps('confirmPassword')}
            type="password"
            placeholder="Repeat password"
            size="medium"
            fullWidth
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <RedAlertMessage>{errors.confirmPassword}</RedAlertMessage>
          )}
        </FormControl>
        <LoadingButton
          type='submit'
          loading={registerLoading}
          fullWidth
          disabled={Object.keys(errors).length > 0 || !dirty}
          sx={{ marginBottom: 3 }}
          variant="contained"
          onClick={()=>handleSubmit()}
        >
          Sign Up
        </LoadingButton>
        <Typography>
          Already have an account?
          <Link to="/login">
            <SignText>Sign In</SignText>
          </Link>
        </Typography>
      </Form>
      <Toaster />
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

const RedAlertMessage = styled.span`
  color: red;
`;

export default Register;
