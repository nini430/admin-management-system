import { object, string, ObjectSchema,ref } from 'yup';

interface RegisterInitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema: ObjectSchema<RegisterInitialValues> = object({
  firstName: string()
    .required('Must provide first Name')
    .min(2, 'first Name should be more than 3 characters long'),
  lastName: string().required('Must provide Last Name'),
  email:string().required('Must provide E-mail').matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,'Must provide valid E-maill addresss'),
  password:string().required('Must provide Password').min(1,'Passord should be at least one characters long'),
  confirmPassword:string().required('Must provide confirm password field').oneOf([ref('password')],'Passwords don\'t match')
});

export { initialValues, validationSchema };
