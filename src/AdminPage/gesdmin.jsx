// src/AdminPage/Gesdmin.jsx
import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage, db } from '@/firebase/config';

const Gesdmin = () => {
  // États
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [pageContent, setPageContent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [pdfUpload, setPdfUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagesList, setImagesList] = useState([]);
  const [pdfsList, setPdfsList] = useState([]);

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger les pages
        const pagesDoc = await getDoc(doc(db, 'admin', 'pages'));
        if (pagesDoc.exists()) setPages(Object.keys(pagesDoc.data()));
        
        // Charger les médias
        await listMedia();
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    };

    loadData();
  }, []);

  // Charger le contenu de la page sélectionnée
  useEffect(() => {
    if (!selectedPage) return;

    const loadPage = async () => {
      const pageDoc = await getDoc(doc(db, 'pages', selectedPage));
      setPageContent(pageDoc.exists() ? pageDoc.data() : { 
        title: '', 
        description: '', 
        images: [], 
        pdf: '' 
      });
    };

    loadPage();
  }, [selectedPage]);

  // Lister les médias
  const listMedia = async () => {
    try {
      // Images
      const imagesRef = ref(storage, 'images/');
      const imagesRes = await listAll(imagesRef);
      const imageUrls = await Promise.all(
        imagesRes.items.map(item => getDownloadURL(item))
      );
      setImagesList(imageUrls);

      // PDFs
      const pdfsRef = ref(storage, 'pdfs/');
      const pdfsRes = await listAll(pdfsRef);
      const pdfUrls = await Promise.all(
        pdfsRes.items.map(item => getDownloadURL(item))
      );
      setPdfsList(pdfUrls);
    } catch (error) {
      console.error("Erreur de chargement des médias:", error);
    }
  };

  // Gestion des uploads
  const handleUpload = async (file, type) => {
    if (!file) return;

    try {
      const fileRef = ref(storage, `${type}s/${file.name}`);
      
      if (type === 'image') {
        const uploadTask = uploadBytes(fileRef, file);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => console.error("Upload error:", error),
          () => {
            setUploadProgress(0);
            listMedia();
          }
        );
      } else {
        await uploadBytes(fileRef, file);
        listMedia();
      }
    } catch (error) {
      console.error(`Erreur d'upload ${type}:`, error);
    }
  };

  // Supprimer un fichier
  const deleteFile = async (url, type) => {
    try {
      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
      listMedia();
    } catch (error) {
      console.error(`Erreur de suppression ${type}:`, error);
    }
  };

  // Sauvegarder les modifications
  const saveChanges = async () => {
    try {
      await updateDoc(doc(db, 'pages', selectedPage), pageContent);
      setIsEditing(false);
      alert('Modifications enregistrées!');
    } catch (error) {
      console.error("Erreur de sauvegarde:", error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panneau d'administration</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sélection de page */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gestion des pages</h2>
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
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full py-2 rounded ${
                isEditing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {isEditing ? 'Annuler' : 'Modifier la page'}
            </button>
          )}
        </div>

        {/* Édition de contenu */}
        {selectedPage && (
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Édition: {selectedPage}
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                {/* Titre */}
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
                          {img.split('/').pop().split('?')[0]}
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
                        {pdf.split('/').pop().split('?')[0]}
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
                {/* Affichage du contenu */}
                <h3 className="text-lg font-medium mb-2">{pageContent.title}</h3>
                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  {pageContent.description}
                </p>

                {/* Galerie d'images */}
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
                      {pageContent.pdf.split('/').pop().split('?')[0]}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Gestion des médias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gestion des images */}
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

        {/* Gestion des PDFs */}
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
                  {pdf.split('/').pop().split('?')[0]}
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