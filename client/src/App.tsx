import {Routes,Route} from 'react-router-dom'

import Register from './pages/Register';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

function App() {
  return <>
  <Routes>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/" element={<AdminPanel/>}/>
  </Routes>
  </>;
}

export default App;
