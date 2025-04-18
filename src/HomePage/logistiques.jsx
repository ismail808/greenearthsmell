import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logistique = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation du camion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentTruck = null;
    let animationFrameId = null;

    const createTruck = () => {
      // Nettoyer l'animation précédente
      if (currentTruck) {
        cancelAnimationFrame(animationFrameId);
        container.removeChild(currentTruck);
      }

      // Création du camion
      const truck = document.createElement('div');
      truck.className = 'absolute bottom-4 h-16 md:h-20 flex transition-transform duration-75 truck-animation';
      
      // Position de départ adaptative
      const startPosition = isMobile ? -150 : -300;
      truck.style.left = `${startPosition}px`;
      
      // Remorque
      const trailer = document.createElement('div');
      trailer.className = 'relative w-24 md:w-32 h-12 md:h-16 bg-white border-4 border-green-600 rounded-l-lg self-end';
      trailer.innerHTML = `
        <div class="absolute inset-1 bg-green-50 rounded-l-sm flex items-center justify-center">
          <div class="text-green-700 text-xs font-bold">GREEN EARTH</div>
        </div>
        <div class="w-5 h-5 md:w-7 md:h-7 bg-black rounded-full absolute -bottom-2 md:-bottom-3 left-4 md:left-6 border-2 border-gray-600"></div>
        <div class="absolute top-0 right-1 md:right-2 w-1 md:w-2 h-3 md:h-4 bg-blue-400"></div>
        <div class="absolute top-0 left-1 md:left-2 w-1 md:w-2 h-3 md:h-4 bg-blue-400"></div>
      `;
      
      // Cabine
      const cab = document.createElement('div');
      cab.className = 'relative z-10 w-16 md:w-20 h-16 md:h-20 bg-green-700 rounded-r-lg';
      cab.innerHTML = `
        <div class="absolute right-2 md:right-3 top-2 md:top-3 w-4 md:w-6 h-4 md:h-6 bg-blue-200 rounded-sm"></div>
        <div class="absolute right-8 md:right-11 top-2 md:top-3 w-4 md:w-6 h-4 md:h-6 bg-blue-200 rounded-sm"></div>
        <div class="w-2 md:w-3 h-1 md:h-2 bg-yellow-300 absolute -left-1 top-6 md:top-8 rounded-l-full"></div>
        <div class="w-5 h-5 md:w-7 md:h-7 bg-black rounded-full absolute -bottom-2 md:-bottom-3 right-4 md:right-6 border-2 border-gray-600"></div>
      `;
      
      truck.appendChild(trailer);
      truck.appendChild(cab);
      container.appendChild(truck);
      currentTruck = truck;
      
      // Animation adaptative
      const duration = isMobile ? 4000 : 10000;
      const distance = container.offsetWidth + Math.abs(startPosition);
      
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        const xPos = startPosition + progress * distance;
        
        truck.style.transform = `translateX(${xPos}px)`;
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          container.removeChild(truck);
          currentTruck = null;
        }
      };
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    const interval = setInterval(createTruck, isMobile ? 4000 : 10000);
    createTruck();
    
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
      if (currentTruck && container.contains(currentTruck)) {
        container.removeChild(currentTruck);
      }
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm py-3 md:py-4 shadow-sm relative z-50">
        <div className="container mx-auto px-4 flex justify-center">
          <div 
            className="text-2xl md:text-4xl font-bold text-green-700 flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="/logo.png" 
              alt="Logo Green Earth Smell" 
              className="relative bg-white rounded-full p-1 w-10 h-10 md:w-14 md:h-14 object-contain" 
            />
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent ml-2">
              Green Earth Smell
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Route avec camion */}
        <div 
          ref={containerRef}
          className="relative h-32 md:h-48 mb-12 md:mb-16 overflow-x-hidden bg-gradient-to-b from-blue-50 to-white border-b-2 border-gray-300"
        >
          <div className="absolute bottom-0 w-full h-2 md:h-3 bg-gray-700 rounded-full"></div>
          <div className="absolute bottom-0 w-full h-8 md:h-10 bg-gray-300/80"></div>
          
          <div className="absolute bottom-4 md:bottom-5 w-full h-0.5 md:h-1 flex gap-6 md:gap-10">
            {[...Array(isMobile ? 10 : 20)].map((_, i) => (
              <div key={i} className="w-12 md:w-20 h-0.5 md:h-1 bg-yellow-300 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden border border-green-100 transition-transform hover:scale-[1.02]">
            <div className="h-36 md:h-48 bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2 md:mb-3">Import/Export</h3>
              <p className="text-sm md:text-base text-gray-600">
                Solution complète pour l'import et l'export de fruits, légumes et herbes aromatiques à travers le monde.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden border border-green-100 transition-transform hover:scale-[1.02]">
            <div className="h-36 md:h-48 bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2 md:mb-3">Réseau Logistique</h3>
              <p className="text-sm md:text-base text-gray-600">
                Plus de 100 partenaires à travers 30 pays pour une livraison rapide et sécurisée de vos produits.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden border border-green-100 transition-transform hover:scale-[1.02]">
            <div className="h-36 md:h-48 bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2 md:mb-3">Qualité Certifiée</h3>
              <p className="text-sm md:text-base text-gray-600">
                Tous nos produits répondent aux normes internationales les plus strictes en matière de qualité.
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-green-700 rounded-lg md:rounded-xl p-6 md:p-8 mb-8 md:mb-12 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Notre Impact en 2023</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">150+</div>
              <div className="text-green-100 text-sm md:text-base">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">500T+</div>
              <div className="text-green-100 text-sm md:text-base">Produits Exportés</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">30+</div>
              <div className="text-green-100 text-sm md:text-base">Pays Desservis</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">24h</div>
              <div className="text-green-100 text-sm md:text-base">Livraison Express</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition duration-300 shadow-md md:shadow-lg transform hover:scale-105 flex items-center mx-auto text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Demander un Devis
          </button>
        </div>
      </div>

      <style jsx>{`
        .truck-animation {
          transition-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

export default Logistique;