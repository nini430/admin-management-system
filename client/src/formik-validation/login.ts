import {ObjectSchema,object,string} from 'yup'

interface LoginInitialValues {
    email:string;
    password:string;
}

const initialValues:LoginInitialValues={
    email:'',
    password:''
}

const validationSchema:ObjectSchema<LoginInitialValues>=object({
    email:string().required().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,'Email is not valid'),
    password: string().required()
})

export {initialValues,validationSchema}