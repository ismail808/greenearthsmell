import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './HomePage/Home';
import Footer from './composant/Footer';
import Produits from './HomePage/Produits';
import Logistique from './HomePage/logistiques';
import Menu from './composant/Menu';
import Contact from './HomePage/Contact';
import Apropos from './HomePage/Apropos'; 
// Notez le 'p' minuscule

const appRoutes = [
  { path: '/', element: <Home />, name: 'Accueil' },
  { path: '/produits', element: <Produits />, name: 'Produits' },
  { path: '/logistique', element: <Logistique />, name: 'Logistique' },
  { path: '/contact', element: <Contact />, name: 'Contact' },
  { path: '/apropos', element: <Apropos />, name: 'A propos' }, // Correspond à l'import
];

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow relative pb-24">
          <Routes>
            {appRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
          <Menu />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;