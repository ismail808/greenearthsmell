import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailRef = useRef(null);
  const receiverRef = useRef(null);

  // Animation de l'email
  useEffect(() => {
    const animateEmail = () => {
      const email = emailRef.current;
      const receiver = receiverRef.current;
      if (!email || !receiver) return;

      // Position initiale (sur l'émetteur)
      email.style.transition = 'none';
      email.style.transform = 'translateX(0)';
      email.style.opacity = '0';
      email.style.left = '25%';
      email.style.top = '50%';

      // Démarrer l'animation après un court délai
      setTimeout(() => {
        email.style.transition = 'transform 1.5s ease-in-out, opacity 0.5s ease-in';
        email.style.opacity = '1';
        
        // Calculer la position finale avec 1.5cm d'espace avant le récepteur
        const receiverRect = receiver.getBoundingClientRect();
        const emailRect = email.getBoundingClientRect();
        const pxPerCm = 37.7952755906;
        const spaceInPx = 1.5 * pxPerCm;
        
        const finalPosition = receiverRect.left - emailRect.left - spaceInPx;
        
        email.style.transform = `translateX(${finalPosition}px)`;
      }, 500);

      // Réinitialiser et répéter
      setTimeout(() => {
        email.style.opacity = '0';
        setTimeout(animateEmail, 1000);
      }, 3000);
    };

    animateEmail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      subject: '', 
      message: '' 
    });
  };

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
        {/* Animation des personnages */}
        <div className="relative flex justify-between items-center mb-16 h-64">
          {/* Personnage émetteur (gauche) */}
          <div className="text-center w-1/4">
            <div className="mx-auto bg-green-100 rounded-full w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-3">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>

          {/* Email animé */}
          <div 
            ref={emailRef}
            className="absolute z-10 bg-white p-3 rounded-lg shadow-md"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>

          {/* Personnage récepteur (droite) */}
          <div ref={receiverRef} className="text-center w-1/4">
            <div className="mx-auto bg-green-100 rounded-full w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-3">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-6xl mx-auto">
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg text-center transition-all duration-500">
              <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h2 className="text-2xl font-bold mb-2">Message envoyé !</h2>
              <p className="mb-4">Notre équipe vous répondra sous 24h.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                Nouveau message
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-green-700 mb-6">Contactez-nous</h2>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Nom / Société*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Téléphone*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Sujet*</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="import">Demande d'import</option>
                    <option value="export">Demande d'export</option>
                    <option value="devis">Demande de devis</option>
                    <option value="info">Information produit</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ height: '200px', resize: 'none' }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    placeholder="Décrivez votre demande (produits, quantités, destinations...)"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-md"
                >
                  Envoyer
                </button>
              </form>

              {/* Informations de contact */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-green-100">
                  <h2 className="text-2xl font-bold text-green-700 mb-6">Coordonnées</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Téléphone</h3>
                        <p className="text-gray-600">+33 1 23 45 67 89</p>
                        <p className="text-gray-600">+33 6 12 34 56 78 (WhatsApp)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Email</h3>
                        <p className="text-gray-600">contact@greenearthsmell.com</p>
                        <p className="text-gray-600">urgence@greenearthsmell.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Adresse</h3>
                        <p className="text-gray-600">123 Rue des Fruits, 75000 Paris</p>
                        <p className="text-gray-600">45 Avenue des Aromates, 13000 Marseille</p>
                      </div>
                    </div>
                  </div>

                  {/* Carte Google Maps */}
                  <div className="mt-8">
                    <h3 className="font-bold text-gray-800 mb-3">Nos implantations</h3>
                    <div className="rounded-xl overflow-hidden shadow-md h-64 md:h-80">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824578976!2d2.264858212902027!3d48.85893841730509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1623257429532!5m2!1sfr!2sfr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps - Green Earth Smell"
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Spécialités */}
                <div className="bg-green-700 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Nos spécialités</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Fruits frais</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Légumes bio</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Herbes aromatiques</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Produits surgelés</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;