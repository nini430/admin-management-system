import {Routes,Route} from 'react-router-dom'

import Auth from './pages/Auth';

function App() {
  return <>
  <Routes>
  <Route path="/register" element={<Auth isRegister/>}/>
  <Route path="/login" element={<Auth isRegister={false}/>}/>
  </Routes>
  </>;
}

export default App;
