import React, { useEffect } from 'react'
import { useAppDispatch } from '../store/store'
import { getMe } from '../store/userSlice';

const AdminPanel = () => {
  const dispatch=useAppDispatch();
  useEffect(()=>{
   dispatch(getMe());
  },[dispatch])
  return (
    <div>AdminPanel</div>
  )
}

export default AdminPanel;