import { Container } from '@mui/material';
import './App.css';
import Header from './layout/Header.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <Header/>
    <div className='frontpage'>
      <Container className='look'>
        <Outlet/>
      </Container>
    </div>
    
    </>
  );
}

export default App;
