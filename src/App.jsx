import { useEffect, useState, useCallback } from 'react'
import Card from './components/Card'
import SearchInput from './components/searchinput'
import axios from 'axios'

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])

  const [error, setError] = useState(null)

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:8000/usuarios')

      setUsuarios(res.data)
      setFiltrados(res.data)
    } catch (err) {
      setError('Error al cargar usuarios')
    }
  }

  console.log(usuarios)

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const filtrarUsuarios = useCallback(
    (query) => {
      setTimeout(() => {
        if (query.trim() === '') {
          setFiltrados(usuarios)
        } else {
          const q = query.trim().toLowerCase()
          const resultados = usuarios.filter((u) =>
            [u.nombre, u.apellidos, u.perfil, u.intereses, u.correo].some(
              (campo) => String(campo).toLowerCase().includes(q)
            )
          )
          setFiltrados(resultados)
        }
      }, 300)
    },
    [usuarios]
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">
        BUSCADOR DE USUARIOS
      </h1>
      <SearchInput onSearch={filtrarUsuarios} />
      {Array.isArray(filtrados) &&
        filtrados.map((usuario) => <Card key={usuario.id} usuario={usuario} />)}
    </div>
  )
}