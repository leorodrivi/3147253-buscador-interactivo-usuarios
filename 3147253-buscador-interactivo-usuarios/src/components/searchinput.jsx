import React from "react";

const SearchInput = ({ value, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Buscar por nombre, apellidos, perfil, intereses o correo..."
        value={value}
        onChange={handleChange}
        className="w-full max-w-2xl p-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
      />
    </div>
  );
};

export default SearchInput;
