export default function Card({ usuario }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-200 border border-gray-100">
      <img
        src={usuario.foto}
        alt={`${usuario.nombre} ${usuario.apellidos}`}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-center font-bold text-lg text-gray-800">
        {usuario.nombre} {usuario.apellidos}
      </h3>
      <p className="text-center text-sm text-gray-600 mt-1">{usuario.perfil}</p>
      <p className="text-center text-xs text-gray-500 italic mt-2">
        {usuario.intereses}
      </p>
      <p className="text-center text-xs text-blue-500 mt-2 truncate">
        {usuario.correo}
      </p>
    </div>
  );
}
