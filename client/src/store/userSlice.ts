import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { LoginInput, RegisterInput } from '../types/user';
import axiosApiInstance from '../axios';


const initialState={
    authedUser:null,
    registerLoading:false,
    loginLoading:false,
    errors:{},
}

export const registerUser=createAsyncThunk('/user/register',async({input,onSuccess}:{input:RegisterInput,onSuccess:(message:string)=>void},thunkApi)=>{
    try{
    const response=await axiosApiInstance.post<{msg:string}>('/user/register',input);
    onSuccess && onSuccess(response.data.msg);
    return response.data;
    }catch(err) {
       return thunkApi.rejectWithValue(err); 
    }
});

export const loginUser=createAsyncThunk('/auth/login',async({input,onSuccess}:{input:LoginInput,onSuccess:VoidFunction},thunkApi)=>{
    try{
    const response=await axiosApiInstance.post('/auth/login',input);
    onSuccess && onSuccess();
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
})

export const getMe=createAsyncThunk('/auth/me',async(_,thunkApi)=>{
     try{
    const response=await axiosApiInstance.get('/auth/me');
    return response.data;
     }catch(err) {
        return thunkApi.rejectWithValue(err);
     }
})


const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        setAuthedUser:(state,action)=>{
            state.authedUser=action.payload;
        }
    },
    extraReducers:builder=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.registerLoading=true;
        });
        builder.addCase(registerUser.fulfilled,(state)=>{
                state.registerLoading=false;
        });
        builder.addCase(registerUser.rejected,(state,action)=>{
            console.log(action.payload);
            console.log(action.error);
        });
        builder.addCase(loginUser.pending,(state)=>{
            state.loginLoading=true;
        });
        builder.addCase(loginUser.fulfilled,(state)=>{
            state.loginLoading=false;
        });
        builder.addCase(loginUser.rejected,(state,action)=>{
            console.log(action.payload);
            console.log(action.error);
        });
        builder.addCase(getMe.fulfilled,(state,action)=>{
            state.authedUser=action.payload;
        })
        
    }
});

export const {setAuthedUser}=userSlice.actions;

export default userSlice.reducer;