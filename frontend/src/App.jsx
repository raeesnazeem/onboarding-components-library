import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">Registry</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
