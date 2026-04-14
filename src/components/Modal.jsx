import { FaArrowLeft } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-create-hotel-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        aria-label="Fermer la fenêtre"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92dvh,92vh)] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-gray-100 bg-white shadow-2xl sm:max-h-[min(90dvh,90vh)] sm:rounded-xl"
      >
        <div className="shrink-0 px-4 pb-3 pt-4 sm:px-6 sm:pt-5">
          <div className="flex items-start gap-2 sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="-ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Retour"
            >
              <FaArrowLeft className="h-4 w-4" />
            </button>
            <h2
              id="modal-create-hotel-title"
              className="min-w-0 flex-1 pt-1 text-xs font-bold uppercase leading-snug tracking-wide text-gray-800 sm:pt-0 sm:text-base"
            >
              CRÉER UN NOUVEAU HÔTEL
            </h2>
          </div>
          <div className="mt-4 border-t border-dotted border-gray-300" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
