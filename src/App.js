import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './routes/home/Home';
import About from './routes/about/About';
import Contact from './routes/contact/Contact';

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
