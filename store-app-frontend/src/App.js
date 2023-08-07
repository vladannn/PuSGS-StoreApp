import { Container } from '@mui/material';
import './App.css';
import Header from './layout/Header.jsx';
import { ToastContainer } from 'react-toastify';
import Rout from './router/Routes.js';


function App() {
  
  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <Header/>
    <div className='frontpage'>
      <Container className='look'>
        <Rout/>
      </Container>
    </div>
    
    </>
  );
}

export default App;
