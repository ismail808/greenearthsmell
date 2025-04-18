import { useState, useEffect } from 'react';

const Gesdmin = () => {
  // Mock database state
  const [mockDb, setMockDb] = useState({
    pages: {
      home: {
        title: 'Page d\'accueil',
        description: 'Bienvenue sur notre site web',
        images: [],
        pdf: ''
      },
      products: {
        title: 'Nos produits',
        description: 'Découvrez notre gamme de produits',
        images: [],
        pdf: ''
      },
      contact: {
        title: 'Contactez-nous',
        description: 'Prenez contact avec notre équipe',
        images: [],
        pdf: ''
      }
    },
    media: {
      images: [],
      pdfs: []
    }
  });

  // UI states
  const [pages, setPages] = useState(Object.keys(mockDb.pages));
  const [selectedPage, setSelectedPage] = useState('');
  const [pageContent, setPageContent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [pdfUpload, setPdfUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagesList, setImagesList] = useState(mockDb.media.images);
  const [pdfsList, setPdfsList] = useState(mockDb.media.pdfs);

  // Load page content when selected
  useEffect(() => {
    if (selectedPage && mockDb.pages[selectedPage]) {
      setPageContent({ ...mockDb.pages[selectedPage] });
    } else {
      setPageContent({ title: '', description: '', images: [], pdf: '' });
    }
  }, [selectedPage, mockDb.pages]);

  // Simulate file upload
  const simulateUpload = (file, type) => {
    console.log(`Uploading file of type: ${type}`); // Example usage
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          const fileUrl = URL.createObjectURL(file);
          resolve(fileUrl);
        }
      }, 100);
    });
  };

  // Handle file uploads
  const handleUpload = async (file, type) => {
    if (!file) return;

    try {
      const fileUrl = await simulateUpload(file, type);
      
      // Update mock database
      setMockDb(prev => {
        const newMedia = { ...prev.media };
        if (type === 'image') {
          newMedia.images = [...newMedia.images, fileUrl];
        } else {
          newMedia.pdfs = [...newMedia.pdfs, fileUrl];
        }
        return { ...prev, media: newMedia };
      });

      // Update UI state
      if (type === 'image') {
        setImagesList(prev => [...prev, fileUrl]);
      } else {
        setPdfsList(prev => [...prev, fileUrl]);
      }
      
      setUploadProgress(0);
    } catch (error) {
      console.error(`Erreur d'upload ${type}:`, error);
      setUploadProgress(0);
    }
  };

  // Delete a file
  const deleteFile = (url, type) => {
    // Update mock database
    setMockDb(prev => {
      const newMedia = { ...prev.media };
      if (type === 'image') {
        newMedia.images = newMedia.images.filter(img => img !== url);
      } else {
        newMedia.pdfs = newMedia.pdfs.filter(pdf => pdf !== url);
      }
      return { ...prev, media: newMedia };
    });

    // Update UI state
    if (type === 'image') {
      setImagesList(prev => prev.filter(img => img !== url));
      // Remove from any page that uses this image
      setMockDb(prev => {
        const newPages = { ...prev.pages };
        Object.keys(newPages).forEach(page => {
          if (newPages[page].images.includes(url)) {
            newPages[page].images = newPages[page].images.filter(img => img !== url);
          }
        });
        return { ...prev, pages: newPages };
      });
    } else {
      setPdfsList(prev => prev.filter(pdf => pdf !== url));
      // Remove from any page that uses this PDF
      setMockDb(prev => {
        const newPages = { ...prev.pages };
        Object.keys(newPages).forEach(page => {
          if (newPages[page].pdf === url) {
            newPages[page].pdf = '';
          }
        });
        return { ...prev, pages: newPages };
      });
    }
  };

  // Save changes to the page
  const saveChanges = () => {
    if (!selectedPage) return;

    setMockDb(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [selectedPage]: pageContent
      }
    }));

    setIsEditing(false);
    alert('Modifications enregistrées!');
  };

  // Add a new page
  const addNewPage = () => {
    const pageName = prompt('Entrez le nom de la nouvelle page:');
    if (pageName && !mockDb.pages[pageName]) {
      setMockDb(prev => ({
        ...prev,
        pages: {
          ...prev.pages,
          [pageName]: {
            title: `Nouvelle page ${pageName}`,
            description: '',
            images: [],
            pdf: ''
          }
        }
      }));
      setPages(prev => [...prev, pageName]);
      setSelectedPage(pageName);
    } else if (pageName) {
      alert('Cette page existe déjà!');
    }
  };

  // Delete current page
  const deletePage = () => {
    if (!selectedPage) return;
    
    if (confirm(`Voulez-vous vraiment supprimer la page ${selectedPage}?`)) {
      setMockDb(prev => {
        const newPages = { ...prev.pages };
        delete newPages[selectedPage];
        return { ...prev, pages: newPages };
      });
      
      setPages(prev => prev.filter(page => page !== selectedPage));
      setSelectedPage('');
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panneau d'administration</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Page selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestion des pages</h2>
            <button 
              onClick={addNewPage}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>
          
          <select
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
          >
            <option value="">Choisir une page</option>
            {pages.map((page) => (
              <option key={page} value={page}>{page}</option>
            ))}
          </select>

          {selectedPage && (
            <div className="space-y-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full py-2 rounded ${
                  isEditing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                {isEditing ? 'Annuler' : 'Modifier la page'}
              </button>
              
              <button
                onClick={deletePage}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Supprimer la page
              </button>
            </div>
          )}
        </div>

        {/* Content editing */}
        {selectedPage && (
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Édition: {selectedPage}
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={pageContent.title || ''}
                    onChange={(e) =>
                      setPageContent({ ...pageContent, title: e.target.value })
                    }
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                    value={pageContent.description || ''}
                    onChange={(e) =>
                      setPageContent({ ...pageContent, description: e.target.value })
                    }
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-gray-700 mb-1">Images</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {pageContent.images?.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt=""
                          className="h-20 w-20 object-cover rounded border"
                        />
                        <button
                          onClick={() => {
                            const newImages = pageContent.images.filter(
                              (_, i) => i !== index
                            );
                            setPageContent({ ...pageContent, images: newImages });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <select
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    onChange={(e) => {
                      if (e.target.value) {
                        setPageContent({
                          ...pageContent,
                          images: [...(pageContent.images || []), e.target.value],
                        });
                      }
                    }}
                  >
                    <option value="">Ajouter une image existante</option>
                    {imagesList
                      .filter((img) => !pageContent.images?.includes(img))
                      .map((img) => (
                        <option key={img} value={img}>
                          {img.split('/').pop()}
                        </option>
                      ))}
                  </select>
                </div>

                {/* PDF */}
                <div>
                  <label className="block text-gray-700 mb-1">PDF associé</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={pageContent.pdf || ''}
                    onChange={(e) =>
                      setPageContent({ ...pageContent, pdf: e.target.value })
                    }
                  >
                    <option value="">Aucun PDF</option>
                    {pdfsList.map((pdf) => (
                      <option key={pdf} value={pdf}>
                        {pdf.split('/').pop()}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={saveChanges}
                  className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  Enregistrer les modifications
                </button>
              </div>
            ) : (
              <div>
                {/* Content display */}
                <h3 className="text-lg font-medium mb-2">{pageContent.title}</h3>
                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  {pageContent.description}
                </p>

                {/* Image gallery */}
                {pageContent.images?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Images:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {pageContent.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt=""
                          className="w-full h-32 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* PDF */}
                {pageContent.pdf && (
                  <div>
                    <h4 className="font-medium mb-1">PDF:</h4>
                    <a
                      href={pageContent.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {pageContent.pdf.split('/').pop()}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Media management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gestion des images</h2>
          
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="mb-2 w-full"
            />
            <button
              onClick={() => handleUpload(imageUpload, 'image')}
              disabled={!imageUpload}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-colors"
            >
              Uploader l'image
            </button>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {imagesList.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt=""
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  onClick={() => deleteFile(img, 'image')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PDF management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gestion des PDFs</h2>
          
          <div className="mb-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfUpload(e.target.files[0])}
              className="mb-2 w-full"
            />
            <button
              onClick={() => handleUpload(pdfUpload, 'pdf')}
              disabled={!pdfUpload}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-colors"
            >
              Uploader le PDF
            </button>
          </div>

          <div className="space-y-2">
            {pdfsList.map((pdf, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded border"
              >
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {pdf.split('/').pop()}
                </a>
                <button
                  onClick={() => deleteFile(pdf, 'pdf')}
                  className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gesdmin;