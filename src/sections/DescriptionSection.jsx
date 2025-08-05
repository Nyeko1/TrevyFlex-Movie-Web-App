import { useState, useRef } from "react";

const DescriptionSection = ({ overview }) => {
  const [showModal, setShowModal] = useState(false);
  const popupRef = useRef(null);

  return (
    <>
      {/* Clamped Description */}
      <div className="text-sm text-gray-300 text-center px-2">
        <p className="line-clamp-3">{overview}</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 text-blue-400 hover:underline text-xs"
        >
          Read More
        </button>
      </div>

     {showModal && (
        <>
          {/* Modal Overlay */}
          <div 
            className="fixed inset-0  z-40"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Content */}
          <div
            ref={popupRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-[85vw] max-w-[320px] max-h-[40vh]
                     sm:absolute sm:top-0 sm:left-50 sm:right-0 sm:transform-none 
                     sm:w-100 sm:max-w-none sm:max-h-[200px] sm:mx-2 sm:mt-2
                     bg-white text-black p-4 rounded-lg shadow-lg z-50 
                     border-4 border-[#cae4f9] overflow-y-auto"
          >
            <p className="text-sm leading-relaxed">{overview}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-blue-600 hover:underline text-xs mx-auto block"
            >
              Show less
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default DescriptionSection;
