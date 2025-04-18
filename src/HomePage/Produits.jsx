import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Produits = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [basketItems, setBasketItems] = useState([]);

  

   
  // Données des produits
  const products = [
    { 
      id: 1, 
      name: 'Légumes', 
      image: '🍅', 
      description: 'Légumes de saison',
      color: 'bg-orange-100',
      animate: '🍅'
    },
    { 
        id: 2, 
        name: 'Fruits', 
        image: '🍓', 
        description: 'Nos fruits frais et bio',
        color: 'bg-red-100',
        animate: '🍓'
    },
    { 
      id: 3, 
      name: 'Herbes Aromatiques', 
      image: '🌱', 
      description: 'Herbes fraîches et séchées',
      color: 'bg-green-100',
      animate: '🌿'
    },
  ];

  // Animation de récolte améliorée
  useEffect(() => {
    const animationSequence = [
      { stage: 0, item: products[0].animate, duration: 1000 },
      { stage: 1, item: products[1].animate, duration: 1200 },
      { stage: 2, item: products[2].animate, duration: 800 },
      { stage: 3, duration: 500 } // Retour au début
    ];

    let currentStep = 0;
    
    const animate = () => {
      const { stage, item, duration } = animationSequence[currentStep];
      setAnimationStage(stage);
      
      if (item) {
        setTimeout(() => {
          setBasketItems(prev => [...prev, item]);
        }, duration - 200);
      } else {
        setBasketItems([]);
      }

      currentStep = (currentStep + 1) % animationSequence.length;
    };

    const interval = setInterval(animate, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setTimeout(() => navigate(`/${product.name.toLowerCase()}`), 800);
  };

  // Animation de chute réaliste
  const FallingItem = ({ item, active }) => (
    <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 text-4xl 
      ${active ? 'animate-fall' : 'opacity-0'}`}
      style={{
        animationTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
      }}
    >
      {item}
      <div className="absolute inset-0 shadow-md rounded-full"></div>
    </div>
  );

  // Arbre avec animation
  const TreeWithAnimation = ({ stage, activeStage, item }) => (
    <div className="relative">
      <div className="text-6xl drop-shadow-lg">🌴</div>
      <FallingItem item={item} active={stage === activeStage} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 overflow-hidden relative">
      {/* Navbar stylisée */}
<nav className="bg-white/80 backdrop-blur-sm py-4 shadow-sm relative">
  <div className="container mx-auto flex justify-center">
    <div 
      className="text-4xl font-bold text-green-700 flex items-center cursor-pointer"
      onClick={() => navigate('/')}
    >
      <img src="logo.png" alt="Logo Green Earth Smell" className="relative bg-white rounded-full p-1 w-14 h-14 object-contain" />
      <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
        Green Earth Smell
      </span>
    </div>
  </div>
  
  {/* Bouton PDF en dessous de la navbar */}
  <div className="absolute right-4 bottom-0 transform translate-y-11 z-20">
    
  </div>
</nav>

        {/* Animation améliorée */}
        <div className="container mx-auto mt-8 h-64 relative overflow-hidden">
          {/* Sol */}
          <div className="absolute bottom-0 w-full h-12 bg-amber-200 rounded-t-xl"></div>
          
          {/* Personnage animé */}
          <div className={`absolute bottom-12 text-5xl transition-all duration-1000 ease-in-out
            ${animationStage === 0 ? 'left-8' : animationStage === 1 ? 'left-1/3' : 'left-2/3'}`}>
            <div className={`transform ${animationStage === 3 ? 'scale-x-[-1]' : ''}`}>
              👩‍🌾
            </div>
          </div>

          {/* Arbres positionnés */}
          <div className="absolute bottom-12 left-8">
            <TreeWithAnimation stage={0} activeStage={animationStage} item={products[0].animate} />
          </div>
          
          <div className="absolute bottom-12 left-1/3">
            <TreeWithAnimation stage={1} activeStage={animationStage} item={products[1].animate} />
          </div>
          
          <div className="absolute bottom-12 right-8">
            <TreeWithAnimation stage={2} activeStage={animationStage} item={products[2].animate} />
          </div>

          {/* Panier animé */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="text-5xl relative">
              🧺
              <div className="absolute -bottom-2 left-0 w-full flex justify-center space-x-1">
                {basketItems.map((item, index) => (
                  <span 
                    key={index} 
                    className="text-2xl animate-[bounce_1s_infinite]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Titre animé */}
        <h1 className="text-center text-4xl font-bold text-green-800 mt-8 mb-12 animate-fadeIn">
          Nos Produits Bio
        </h1>

        {/* Produits avec animations améliorées */}
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`${product.color} rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                ${selectedProduct === product ? 
                  'transform scale-105 z-10 ring-4 ring-green-500/50 shadow-2xl' : 
                  'hover:-translate-y-2'}`}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative h-56 flex items-center justify-center">
                <span className={`text-9xl transition-transform duration-500 ${selectedProduct === product ? 'scale-110 rotate-6' : ''}`}>
                  {product.image}
                </span>
                {selectedProduct === product && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold bg-green-600/90 px-4 py-2 rounded-full animate-pulse">
                      Explorer {product.name} →
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <button className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-6 py-2 
                  hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg">
                  Découvrir
                </button>
              </div>
            </div>
          ))}

      </div>
      </div>
  );
};

export default Produits;