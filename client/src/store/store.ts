import {configureStore} from '@reduxjs/toolkit'
import {useSelector,useDispatch,TypedUseSelectorHook} from 'react-redux';
import userReducer from './userSlice'

const store=configureStore({
    reducer:{
        userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch:()=>AppDispatch=useDispatch;

export default store;