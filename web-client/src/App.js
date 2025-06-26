import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login    from './components/Login';
import Auctions from './components/AuctionsList';
import Auction  from './components/AuctionDetail';
import './App.css';

function App() {
  const isAuth = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/auctions" element={
          isAuth ? <Auctions /> : <Navigate to="/login" replace />
        }/>
        <Route path="/auction/:id" element={
          isAuth ? <Auction /> : <Navigate to="/login" replace />
        }/>
        <Route path="*" element={<Navigate to={isAuth ? "/auctions" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
