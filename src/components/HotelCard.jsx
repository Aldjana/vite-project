import { useState } from 'react';

const HotelCard = ({ hotel, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = () => {
    setShowActions(!showActions);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(hotel);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(hotel);
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={handleCardClick}
    >
      <div className="aspect-[4/3] bg-gray-200">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-1.5 line-clamp-2 leading-snug">{hotel.address}</p>
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">{hotel.name}</h3>
        <p className="text-blue-600 font-bold text-sm">
          {hotel.price}
          <span className="text-gray-500 font-normal text-xs"> / nuit</span>
        </p>
      </div>
      
      {showActions && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="flex gap-3">
            <button
              onClick={handleEditClick}
              className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Modifier l'hôtel"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Supprimer l'hôtel"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default HotelCard;
