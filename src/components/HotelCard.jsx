const HotelCard = ({ hotel }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
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
    </article>
  );
};

export default HotelCard;
