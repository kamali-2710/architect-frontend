import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from "react-router-dom";
// import Login from './Login.jsx';
// import Register from './Register.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    {/* <Login /> */}
    {/* <Register /> */}
    </BrowserRouter>
  </StrictMode>,
) 
