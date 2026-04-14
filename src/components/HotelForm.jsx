import { FaImage } from 'react-icons/fa';

const HotelForm = ({ hotel, photoPreview, onChange, onPhotoChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5 pt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div>
          <label htmlFor="hotel-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nom de l&apos;hôtel
          </label>
          <input
            id="hotel-name"
            type="text"
            name="name"
            value={hotel.name}
            onChange={onChange}
            required
            className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:min-h-0 sm:text-sm"
            placeholder="CAP Marniane"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="hotel-address" className="block text-sm font-medium text-gray-700 mb-1.5">
            Adresse
          </label>
          <input
            id="hotel-address"
            type="text"
            name="address"
            value={hotel.address}
            onChange={onChange}
            required
            className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:min-h-0 sm:text-sm"
            placeholder="Les îles du saloum, Mar Lodj"
          />
        </div>
        <div>
          <label htmlFor="hotel-email" className="block text-sm font-medium text-gray-700 mb-1.5">
            E-mail
          </label>
          <input
            id="hotel-email"
            type="email"
            name="email"
            value={hotel.email}
            onChange={onChange}
            required
            className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:min-h-0 sm:text-sm"
            placeholder="information@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="hotel-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Numéro de téléphone
          </label>
          <input
            id="hotel-phone"
            type="tel"
            name="phone"
            value={hotel.phone}
            onChange={onChange}
            required
            className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:min-h-0 sm:text-sm"
            placeholder="+221 77 777 77 77"
          />
        </div>
        <div>
          <label htmlFor="hotel-price" className="block text-sm font-medium text-gray-700 mb-1.5">
            Prix par nuit
          </label>
          <input
            id="hotel-price"
            type="text"
            name="price"
            value={hotel.price}
            onChange={onChange}
            required
            className="min-h-[44px] w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:min-h-0 sm:text-sm"
            placeholder="25.000 XOF"
          />
        </div>
        <div>
          <label htmlFor="hotel-currency" className="block text-sm font-medium text-gray-700 mb-1.5">
            Devise
          </label>
          <select
            id="hotel-currency"
            name="currency"
            value={hotel.currency}
            onChange={onChange}
            className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:min-h-0 sm:text-sm"
          >
            <option value="XOF">F XOF</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-1.5">Ajouter une photo</p>
        <label className="flex flex-col items-center justify-center min-h-[140px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100/80 transition-colors">
          <input type="file" accept="image/*" className="sr-only" onChange={onPhotoChange} />
          {photoPreview ? (
            <img src={photoPreview} alt="" className="max-h-36 w-auto object-contain rounded-md p-2" />
          ) : (
            <span className="flex flex-col items-center gap-2 text-gray-400 py-6">
              <FaImage className="w-8 h-8" />
              <span className="text-sm">Ajouter une photo</span>
            </span>
          )}
        </label>
      </div>

      <div className="flex justify-end border-t border-gray-100 pt-4">
        <button
          type="submit"
          className="min-h-[48px] w-full rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900 sm:min-h-0 sm:w-auto sm:px-8"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default HotelForm;
