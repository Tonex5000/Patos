import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewToCrypto from './pages/NewToCrypto';
import Terms from './pages/Terms';
import Listings from './pages/Listings';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
  <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new-to-crypto' element={<NewToCrypto />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/listings' element={<Listings />} />
      </Routes>
      <ToastContainer autoClose={3000} draggableDirection="x" toastStyle={{ backgroundColor: "#ffffff", color: "#000000cc" }} />
      </>
      
  )
}

export default App
