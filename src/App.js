import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './routes/home/Home';
import About from './routes/about/About';
import Contact from './routes/contact/Contact';
import Branches from './routes/branches/Branches';
import Cart from './routes/cart/Cart';
import PrivateRoute from './routes/private/PrivateRoute'
import Admin from './routes/admin/Admin'
import AdminLogin from './routes/adminLogin/AdminLogin';

function App() {
  return (
    <div className="app">
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/branches' element={<Branches/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<AdminLogin/>}/>
        <Route path='/' element={<PrivateRoute/>}>
          <Route path='/admin' element={<Admin/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
