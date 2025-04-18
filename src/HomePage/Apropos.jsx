import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Apropos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('qui-sommes');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Vérifie au chargement
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Première Navbar - Complètement inchangée */}
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

      {/* Deuxième Navbar - Modifications MOBILE SEULEMENT */}
      <nav className="bg-green-700 text-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className={`flex ${isMobile ? 'overflow-x-auto py-2 hide-scrollbar' : 'py-3 space-x-8 justify-center'}`}>
            <div className={`flex ${isMobile ? 'space-x-2 min-w-max' : 'space-x-8'}`}>
              <button
                onClick={() => setActiveTab('qui-sommes')}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition ${
                  activeTab === 'qui-sommes' 
                    ? 'bg-white text-green-700 font-bold' 
                    : 'hover:bg-green-600'
                } ${isMobile ? 'text-sm' : ''}`}
              >
                {isMobile ? 'Qui sommes-nous' : 'Qui nous sommes'}
              </button>
              <button
                onClick={() => setActiveTab('outils')}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition ${
                  activeTab === 'outils' 
                    ? 'bg-white text-green-700 font-bold' 
                    : 'hover:bg-green-600'
                } ${isMobile ? 'text-sm' : ''}`}
              >
                {isMobile ? 'Outils' : 'Outils de production'}
              </button>
              <button
                onClick={() => setActiveTab('conditionnement')}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition ${
                  activeTab === 'conditionnement' 
                    ? 'bg-white text-green-700 font-bold' 
                    : 'hover:bg-green-600'
                } ${isMobile ? 'text-sm' : ''}`}
              >
                Conditionnement
              </button>
              <button
                onClick={() => setActiveTab('ferme')}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition ${
                  activeTab === 'ferme' 
                    ? 'bg-white text-green-700 font-bold' 
                    : 'hover:bg-green-600'
                } ${isMobile ? 'text-sm' : ''}`}
              >
                Notre Ferme
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal - Complètement inchangé */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {activeTab === 'qui-sommes' && (
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6">Qui nous sommes</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Notre histoire</h3>
                  <p className="text-gray-700 mb-4">
                    Fondée en 2010, Green Earth Smell est née de la passion pour les produits agricoles de qualité. 
                    Nous avons commencé comme une petite ferme familiale et sommes devenus un acteur majeur dans 
                    l'import/export de fruits, légumes et herbes aromatiques.
                  </p>
                  <p className="text-gray-700">
                    Notre engagement envers la qualité et le développement durable nous a permis de bâtir un réseau 
                    de plus de 100 partenaires à travers 30 pays.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Notre équipe</h3>
                  <p className="text-gray-700 mb-4">
                    Une équipe de 50 professionnels passionnés travaille quotidiennement pour vous offrir les meilleurs 
                    produits. Agriculteurs, logisticiens, commerciaux - tous partagent la même vision d'une agriculture 
                    responsable.
                  </p>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-green-700 font-medium">
                      "Notre mission : Connecter les meilleurs producteurs du monde aux marchés les plus exigeants."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outils' && (
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6">Outils de production</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Technologies modernes</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Serres high-tech avec contrôle climatique</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Irrigation goutte-à-goutte intelligente</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Systèmes hydroponiques pour cultures hors-sol</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Drones pour surveillance des cultures</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Méthodes durables</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Agriculture biologique certifiée</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lutte biologique contre les parasites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Recyclage de 100% de nos déchets organiques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Énergie solaire pour 80% de nos besoins</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conditionnement' && (
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6">Conditionnement</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Processus qualité</h3>
                  <ol className="space-y-4 text-gray-700 list-decimal pl-5">
                    <li>Récolte à maturité optimale</li>
                    <li>Tri manuel et électronique</li>
                    <li>Lavage à l'eau purifiée</li>
                    <li>Contrôle qualité en 5 points</li>
                    <li>Emballage sous atmosphère protectrice</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Nos certifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-green-600 font-bold">AB</span>
                      </div>
                      <span className="text-sm text-center">Agriculture Biologique</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-green-600 font-bold">ISO</span>
                      </div>
                      <span className="text-sm text-center">ISO 22000</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-green-600 font-bold">GAP</span>
                      </div>
                      <span className="text-sm text-center">GlobalG.A.P.</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-green-600 font-bold">FSSC</span>
                      </div>
                      <span className="text-sm text-center">FSSC 22000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ferme' && (
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6">Notre Ferme</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Installations</h3>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img 
                      src="/ferme.jpg" 
                      alt="Notre ferme" 
                      className="w-full h-auto rounded-lg object-cover shadow-md"
                    />
                  </div>
                  <p className="text-gray-700">
                    Notre ferme principale s'étend sur 120 hectares dans la région de Provence, avec :
                  </p>
                  <ul className="mt-2 space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>50 serres high-tech</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Unité de conditionnement de 5000m²</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Laboratoire d'analyse qualité</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3">Chiffres clés</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">150+</p>
                      <p className="text-gray-700">Espèces cultivées</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">500T</p>
                      <p className="text-gray-700">Production mensuelle</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">80%</p>
                      <p className="text-gray-700">Export international</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Style pour masquer la scrollbar - Nouveau */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Apropos;