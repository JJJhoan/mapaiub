import React from "react";

export function Modal({ tipo, mensaje, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
      <div className="bg-white rounded-xl shadow-xl p-6 border w-96">
        <h3 className="text-xl font-bold text-center text-green-700">Éxito</h3>
        <p className="text-center text-gray-700 mb-4">{mensaje}</p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
