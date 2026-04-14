import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const HotelsHeader = ({ hotelCount, onCreateHotel }) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <p className="text-gray-600">Hôtels {hotelCount}</p>
      </div>
      <button 
        onClick={onCreateHotel}
        className="flex gap-3 items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <FaPlus className='w-4 h-4' />
        Créer un nouveau hôtel
      </button>
    </div>
  );
};

export default HotelsHeader;
