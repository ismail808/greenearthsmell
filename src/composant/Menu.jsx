import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: '🏠', label: 'Accueil', path: '/' },
  { icon: '🛒', label: 'Produits', path: '/produits' },
  { icon: '🚚', label: 'Logistique', path: '/logistique' },
  { icon: '✉️', label: 'Contact', path: '/contact' },
  { icon: 'ℹ️', label: 'À propos', path: '/Apropos' } // Simplifié comme les autres boutons
];

const Menu = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleNavigation = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      {/* Bouton menu flottant */}
      <div className="fixed bottom-6 right-6 z-50" ref={buttonRef}>
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 text-2xl
            focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
          aria-label="Menu principal"
          aria-expanded={showMenu}
        >
          {showMenu ? '×' : '+'}
        </button>
      </div>

      {/* Menu déroulant */}
      {showMenu && (
        <div 
          ref={menuRef}
          className="fixed bottom-20 right-6 z-40 bg-white rounded-lg shadow-xl p-4 w-64 max-h-[80vh] overflow-y-auto
          animate-fadeIn border border-gray-100"
        >
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleNavigation(item.path)}
                  className="w-full text-left px-4 py-2 hover:bg-green-50 rounded-md flex items-center
                  transition-colors duration-200 text-gray-800 hover:text-green-700"
                >
                  <span className="mr-2 text-lg">{item.icon}</span> 
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Styles d'animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Menu;