import { useState, useEffect } from "react";
import { Boxes, Truck, Phone, Info, Leaf, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const navigate = useNavigate();

  // Animation de rotation des boutons (comme une horloge)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (id) => {
    // Navigation directe sans animation
    navigate(`/${id}`);
  };

  const categories = [
    {
      id: "produits",
      name: "Produits",
      icon: <Boxes className="h-6 w-6" />,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      shadowColor: "shadow-indigo-500/50",
      image: "/images/produits.jpg",
      description: "Découvrez notre gamme de produits variés",
    },
    {
      id: "logistique",
      name: "Logistique",
      icon: <Truck className="h-6 w-6" />,
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
      shadowColor: "shadow-amber-500/50",
      image: "/images/logistique.jpg",
      description: "Solutions de transport et stockage",
    },
    {
      id: "contact",
      name: "Contact",
      icon: <Phone className="h-6 w-6" />,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      shadowColor: "shadow-blue-500/50",
      image: "/images/contact.jpg",
      description: "Contactez-nous pour vos demandes",
    },
    {
      id: "apropos",
      name: "À Propos",
      icon: <Info className="h-6 w-6" />,
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      shadowColor: "shadow-teal-500/50",
      image: "/images/apropos.jpg",
      description: "Notre histoire et nos engagements",
    },
    {
      id: "legumes",
      name: "Légumes",
      icon: <Leaf className="h-6 w-6" />,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      shadowColor: "shadow-green-500/50",
      image: "/images/legumes.jpg",
      description: "Légumes frais et locaux",
    },
    {
      id: "herbes",
      name: "Herbes",
      icon: <Sprout className="h-6 w-6" />,
      color: "bg-lime-500",
      hoverColor: "hover:bg-lime-600",
      shadowColor: "shadow-lime-500/50",
      image: "/images/herbes.jpg",
      description: "Herbes aromatiques et médicinales",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 overflow-hidden relative">
      {/* Fond d'écran */}
      <div className="absolute inset-0 z-0">
        <img 
          src="backg.png"
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-800/40 backdrop-blur-sm"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        {/* En-tête */}
        <div className="pt-6 pb-2 text-center">
          <div className="inline-flex items-center justify-center mb-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-75 blur"></div>
              <img 
                src="logo.png"
                alt="Logo Green Earth Smell" 
                className="relative bg-white rounded-full p-1 w-14 h-14 object-contain" 
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-1">Green Earth Smell</h1>
          <p className="text-sm text-green-700 max-w-md mx-auto">
            Import & Export de Fruits, Légumes et Herbes Aromatiques
          </p>
        </div>

        {/* Menu orbital */}
        <div className="relative w-full max-w-xs mx-auto h-[300px] mb-6">
          {/* Bouton central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
            <div className="text-center w-full h-full flex flex-col items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600 mx-auto" />
              <span className="block text-xs font-medium text-green-800 mt-1">Qualité Premium</span>
            </div>
          </div>

          {/* Boutons orbitaux */}
          <div 
            className="absolute top-1/2 left-1/2 w-[250px] h-[250px] transform -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            {categories.map((category, index) => {
              const angle = index * ((2 * Math.PI) / categories.length) - Math.PI / 2;
              const radius = 100;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={category.id}
                  className={`absolute top-1/2 left-1/2 w-16 h-16 ${category.color} ${category.hoverColor} rounded-full shadow-md ${category.shadowColor} overflow-hidden transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform z-20`}
                  style={{
                    marginLeft: x,
                    marginTop: y,
                    transform: `rotate(-${rotationAngle}deg)` 
                  }}
                  onClick={() => handleButtonClick(category.id)}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    {category.icon}
                    <span className="text-xs font-medium mt-1">{category.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="max-w-xs mx-auto text-center px-4 mb-6">
          <h2 className="text-lg font-bold text-white mb-2">
            Votre Partenaire pour des Produits Naturels d'Exception
          </h2>
          <p className="text-sm text-white mb-4">
            Depuis plus de 15 ans, Green Earth Smell sélectionne pour vous les meilleurs produits à travers le monde.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-green-800">100% Naturel</span>
            </div>
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-green-800">Livraison Mondiale</span>
            </div>
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-green-800">Qualité Garantie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;