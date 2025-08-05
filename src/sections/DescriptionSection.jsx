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
        <div
          ref={popupRef}
          className="absolute left-10 mt-2 w-[300px]
           max-h-[200px] border-4 border-[#cae4f9] bg-white
            text-black p-4 rounded-lg shadow-lg z-50 text-left flex flex-col overflow-y-auto"
        >
          <p className="text-sm leading-relaxed">{overview}</p>
          <button
            onClick={() => setShowModal(false)}
            className="mt-3 text-blue-600 hover:underline text-xs mx-auto block"
          >
            Show less
          </button>
        </div>
      )}
    </>
  );
};
export default DescriptionSection;
