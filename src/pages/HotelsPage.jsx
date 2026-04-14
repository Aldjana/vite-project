import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Header from '../components/Header';
import HotelCard from '../components/HotelCard';
import Modal from '../components/Modal';
import HotelForm from '../components/HotelForm';

const emptyHotel = {
  name: '',
  address: '',
  email: '',
  phone: '',
  price: '',
  currency: 'XOF',
  image: '',
};

const HotelsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [newHotel, setNewHotel] = useState(emptyHotel);
  const [photoPreview, setPhotoPreview] = useState(null);

  const hotels = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      address: 'Boulevard Martin Luther King, Dakar',
      name: 'Hôtel Terrou-Bi',
      price: '85000 CFA',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      address: 'Plateau, Dakar',
      name: 'Hôtel Savana Dakar',
      price: '75000 CFA',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
      address: 'Corniche Ouest, Dakar',
      name: 'Radisson Blu Hotel Dakar',
      price: '120000 CFA',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
      address: 'Almadies, Dakar',
      name: 'Hôtel La Madrague',
      price: '65000 CFA',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400',
      address: 'Yoff, Dakar',
      name: 'Hôtel Ngor',
      price: '40000 CFA',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
      address: 'Mermoz, Dakar',
      name: 'King Fahd Palace Hotel',
      price: '150000 CFA',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
      address: 'Saly, Mbour',
      name: 'Hôtel Lamantin Beach',
      price: '55000 CFA',
    },
   
     {
      id: 8,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3085171?w=400',
      address: 'place de lindependance, Dakar',
      name: 'Hotel pullman',
      price: '45000 CFA',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setNewHotel(emptyHotel);
    setPhotoPreview(null);
    setShowModal(false);
  };

  const handleModalClose = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setNewHotel(emptyHotel);
    setShowModal(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <Header title="Liste des hôtels" />

      <div className="shrink-0 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-gray-800 font-medium">
            Hôtels <span className="text-gray-600 font-normal">{hotels.length}</span>
          </p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-900 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 sm:w-auto sm:min-h-0 sm:px-5"
          >
            <FaPlus className="w-4 h-4" />
            Créer un nouveau hôtel
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleModalClose}>
        <HotelForm
          hotel={newHotel}
          photoPreview={photoPreview}
          onChange={handleInputChange}
          onPhotoChange={handlePhotoChange}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default HotelsPage;
