import { useState, useEffect, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Header from '../components/Header';
import HotelCard from '../components/HotelCard';
import Modal from '../components/Modal';
import HotelForm from '../components/HotelForm';
import { fetchHotels, createHotelRequest, updateHotelRequest, deleteHotelRequest } from '../services/hotelsApi';

const emptyHotel = {
  name: '',
  address: '',
  email: '',
  phone: '',
  price: '',
  currency: 'XOF',
  image: ''
};

const DEFAULT_HOTEL_IMAGE =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';

const HotelsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [newHotel, setNewHotel] = useState(emptyHotel);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [listLoading, setListLoading] = useState(true);
  const [saveError, setSaveError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const loadHotels = useCallback(async () => {
    setLoadError('');
    setListLoading(true);
    try {
      const list = await fetchHotels();
      setHotels(list);
    } catch (err) {
      setLoadError(err.message || 'Impossible de charger les hôtels');
      setHotels([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      setSaveError("L'image est trop volumineuse (maximum 2 Mo). Choisissez une photo plus légère.");
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');
    const priceLabel = [newHotel.price?.trim(), newHotel.currency].filter(Boolean).join(' ').trim();
    const imageUrl = photoPreview || DEFAULT_HOTEL_IMAGE;

    try {
      setSaveLoading(true);
      let result;
      
      if (editingHotel) {
        result = await updateHotelRequest(editingHotel.id, {
          name: newHotel.name.trim(),
          address: newHotel.address.trim(),
          email: newHotel.email.trim(),
          phone: newHotel.phone.trim(),
          priceLabel: priceLabel || `${newHotel.currency}`,
          image: imageUrl
        });
      } else {
        result = await createHotelRequest({
          name: newHotel.name.trim(),
          address: newHotel.address.trim(),
          email: newHotel.email.trim(),
          phone: newHotel.phone.trim(),
          priceLabel: priceLabel || `${newHotel.currency}`,
          image: imageUrl
        });
      }

      if (result?.hotel) {
        if (editingHotel) {
          setHotels((prev) => prev.map(h => h.id === editingHotel.id ? result.hotel : h));
        } else {
          setHotels((prev) => [result.hotel, ...prev]);
        }
      } else {
        await loadHotels();
      }

      setNewHotel(emptyHotel);
      setPhotoPreview(null);
      setEditingHotel(null);
      setShowModal(false);
    } catch (err) {
      setSaveError(err.message || "Impossible d'enregistrer l'hôtel");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleModalClose = () => {
    setSaveError('');
    setPhotoPreview(null);
    setNewHotel(emptyHotel);
    setEditingHotel(null);
    setShowModal(false);
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setNewHotel({
      name: hotel.name || '',
      address: hotel.address || '',
      email: hotel.email || '',
      phone: hotel.phone || '',
      price: hotel.price || '',
      currency: 'XOF',
      image: hotel.image || ''
    });
    setPhotoPreview(hotel.image || null);
    setShowModal(true);
  };

  const handleDeleteHotel = async (hotel) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'hôtel "${hotel.name}" ?`)) {
      return;
    }

    try {
      await deleteHotelRequest(hotel.id);
      setHotels((prev) => prev.filter(h => h.id !== hotel.id));
    } catch (err) {
      setSaveError(err.message || "Impossible de supprimer l'hôtel");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <Header title="Liste des hôtels" />

      <div className="shrink-0 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-gray-800 font-medium">
            Hôtels{' '}
            <span className="text-gray-600 font-normal">{listLoading ? '…' : hotels.length}</span>
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={listLoading}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-900 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50 sm:w-auto sm:min-h-0 sm:px-5"
          >
            <FaPlus className="w-4 h-4" />
            Créer un nouveau hôtel
          </button>
        </div>
      </div>

      {loadError && (
        <div className="shrink-0 border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-7xl">{loadError}</p>
          <button
            type="button"
            onClick={loadHotels}
            className="mt-2 text-sm font-medium text-red-900 underline"
          >
            Réessayer
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:p-6 lg:p-8">
          {listLoading ? (
            <p className="text-center text-gray-600 text-sm">Chargement des hôtels…</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {hotels.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onEdit={handleEditHotel}
                  onDelete={handleDeleteHotel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleModalClose}>
        {saveError && (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {saveError}
          </p>
        )}
        <HotelForm
          hotel={newHotel}
          photoPreview={photoPreview}
          onChange={handleInputChange}
          onPhotoChange={handlePhotoChange}
          onSubmit={handleSubmit}
          submitDisabled={saveLoading}
          submitLabel={saveLoading ? 'Enregistrement…' : (editingHotel ? 'Mettre à jour' : 'Enregistrer')}
        />
      </Modal>
    </div>
  );
};

export default HotelsPage;
