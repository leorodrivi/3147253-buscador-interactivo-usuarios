export default function Card({usuario}) {
    return (
        <div className="p-4 bg-white shadow-md rounded hover:scale-105 transition-transform">
            <img
            src={usuario.foto}
            alt={usuario.nombre}
            className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-center font-bold mt-2">{usuario.nombre}{usuario.apellidos}</h3>
            <p className="text-center text-sm text-gray-600">{usuario.perfil}</p>
            <p className="text-center text-xs text-gray-600 italic">{usuario.intereses}</p>
            <p className="text-center text-xs text-blue-500">{usuario.correo}</p>
        </div>
    )
}