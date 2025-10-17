import { useEffect, useState, useCallback } from 'react'
import Card from './components/Card.jsx'
import SearchInput from './components/searchinput.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { logout } = useAuth() 

  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  const obtenerUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('http://localhost:8000/usuarios')
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      
      const data = await response.json()
    
      console.log('Datos recibidos de API:', data)
      
      setUsuarios(data)
      setFiltrados(data)
      
    } catch (err) {
      console.log('Error al cargar API, usando datos locales:', err.message)
      setError('No se pudo conectar al servidor. Usando datos de prueba.')
    } finally {
      setLoading(false)
    }
  }

  const filtrarUsuarios = useCallback((query) => {
    setSearchQuery(query)
    setCurrentPage(1)
    
    if (query.trim() === '') {
      setFiltrados(usuarios)
    } else {
      const q = query.trim().toLowerCase()
      const resultados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(q) ||
        usuario.apellidos.toLowerCase().includes(q) ||
        usuario.perfil.toLowerCase().includes(q) ||
        usuario.intereses.toLowerCase().includes(q) ||
        usuario.correo.toLowerCase().includes(q)
      )
      setFiltrados(resultados)
    }
  }, [usuarios])

  // Calcular usuarios para la página actual
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filtrados.slice(indexOfFirstUser, indexOfLastUser)

  // Calcular total de páginas
  const totalPages = Math.ceil(filtrados.length / usersPerPage)

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Ir a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Ir a página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son 5 o menos
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Mostrar páginas alrededor de la página actual
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(totalPages, currentPage + 2)
      
      if (currentPage <= 3) {
        endPage = maxPagesToShow
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
    }
    
    return pageNumbers
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  useEffect(() => {
    console.log('Usuarios en estado:', usuarios)
    console.log('Filtrados en estado:', filtrados)
  }, [usuarios, filtrados])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          BUSCADOR DE USUARIOS
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out shadow-md"
        >
          Cerrar Sesión
        </button>
      </div>
      
      <SearchInput value={searchQuery} onSearch={filtrarUsuarios} />
      
      {loading && (
        <div className="text-center">
          <p className="text-blue-500 text-lg">Cargando usuarios...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Aviso:</strong> {error}
        </div>
      )}
      
      {!loading && (
        <div>
          <p className="text-center text-gray-600 mb-4">
            Mostrando {currentUsers.length} de {filtrados.length} usuarios encontrados
            {filtrados.length > usersPerPage && ` (Página ${currentPage} de ${totalPages})`}
          </p>
          
          {currentUsers.length === 0 ? (
            <p className="text-center text-gray-500">No se encontraron usuarios</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentUsers.map((usuario) => (
                  <Card key={usuario.id} usuario={usuario} />
                ))}
              </div>

              {/* Componente de Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  {/* Botón Anterior */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Anterior
                  </button>

                  {/* Números de Página */}
                  {getPageNumbers().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-2 rounded ${
                        currentPage === number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  {/* Botón Siguiente */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}