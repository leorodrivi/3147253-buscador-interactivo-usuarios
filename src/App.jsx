import { useEffect, useState, useCallback } from 'react'
import Card from './components/Card.jsx'
import SearchInput from './components/searchinput.jsx'

const datosDePrueba = [
  {
    "id": 1,
    "nombre": "Marianela",
    "apellidos": "Pascual",
    "correo": "ofeliaespinosa@valverde-arce.com",
    "foto": "https://randomuser.me/api/portraits/women/1.jpg",
    "perfil": "Administrador de Bases de Datos",
    "intereses": "voluptates, sapiente, a"
  },
  {
    "id": 2,
    "nombre": "Rosenda",
    "apellidos": "Soria",
    "correo": "wpomares@gmail.com",
    "foto": "https://randomuser.me/api/portraits/men/2.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "odit, amet, nostrum"
  },
  {
    "id": 3,
    "nombre": "Consuelo",
    "apellidos": "Recio",
    "correo": "casemiro35@pinedo.com",
    "foto": "https://randomuser.me/api/portraits/women/3.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "optio, aut, totam"
  },
  {
    "id": 4,
    "nombre": "Celia",
    "apellidos": "Ferrández",
    "correo": "anitamoraleda@zurita-dieguez.com",
    "foto": "https://randomuser.me/api/portraits/men/4.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "dolores, neque, veritatis"
  },
  {
    "id": 5,
    "nombre": "Bartolomé",
    "apellidos": "Bermúdez",
    "correo": "vvicens@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/women/5.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "eos, molestias, quisquam"
  },
  {
    "id": 6,
    "nombre": "Nacho",
    "apellidos": "Posada",
    "correo": "cesar07@aroca-mascaro.es",
    "foto": "https://randomuser.me/api/portraits/men/6.jpg",
    "perfil": "QA Tester",
    "intereses": "illo, atque, accusantium"
  },
  {
    "id": 7,
    "nombre": "Francisca",
    "apellidos": "Palacios",
    "correo": "teodoro20@cardona.es",
    "foto": "https://randomuser.me/api/portraits/women/7.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "molestiae, in, hic"
  },
  {
    "id": 8,
    "nombre": "Ainara",
    "apellidos": "Daza",
    "correo": "aragonanunciacion@benitez.es",
    "foto": "https://randomuser.me/api/portraits/men/8.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "eos, quasi, itaque"
  },
  {
    "id": 9,
    "nombre": "Segismundo",
    "apellidos": "Azorin",
    "correo": "dieguezovidio@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/women/9.jpg",
    "perfil": "QA Tester",
    "intereses": "tempore, quas, ab"
  },
  {
    "id": 10,
    "nombre": "Aitor",
    "apellidos": "Elías",
    "correo": "beatriz11@abad-calvet.org",
    "foto": "https://randomuser.me/api/portraits/men/10.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "nostrum, molestiae, odit"
  },
  {
    "id": 11,
    "nombre": "Delfina",
    "apellidos": "Sosa",
    "correo": "elodiasanchez@rincon-blasco.com",
    "foto": "https://randomuser.me/api/portraits/women/11.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "architecto, distinctio, repellendus"
  },
  {
    "id": 12,
    "nombre": "Lucas",
    "apellidos": "Bernal",
    "correo": "mohamed10@vina.es",
    "foto": "https://randomuser.me/api/portraits/men/12.jpg",
    "perfil": "Scrum Master",
    "intereses": "incidunt, ipsam, distinctio"
  },
  {
    "id": 13,
    "nombre": "Luis",
    "apellidos": "Catalán",
    "correo": "eutimiocardenas@yahoo.com",
    "foto": "https://randomuser.me/api/portraits/women/13.jpg",
    "perfil": "Administrador de Bases de Datos",
    "intereses": "quibusdam, facilis, explicabo"
  },
  {
    "id": 14,
    "nombre": "Felipe",
    "apellidos": "Cervera",
    "correo": "bjordan@salazar.com",
    "foto": "https://randomuser.me/api/portraits/men/14.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "repellendus, a, accusantium"
  },
  {
    "id": 15,
    "nombre": "Iker",
    "apellidos": "Zurita",
    "correo": "desiderioaragon@camara.org",
    "foto": "https://randomuser.me/api/portraits/women/15.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "eius, excepturi, corrupti"
  },
  {
    "id": 16,
    "nombre": "Iker",
    "apellidos": "Dominguez",
    "correo": "rosario55@noriega.com",
    "foto": "https://randomuser.me/api/portraits/men/16.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "soluta, praesentium, magni"
  },
  {
    "id": 17,
    "nombre": "Leticia",
    "apellidos": "Huerta",
    "correo": "mtorrents@gmail.com",
    "foto": "https://randomuser.me/api/portraits/women/17.jpg",
    "perfil": "QA Tester",
    "intereses": "aut, corporis, omnis"
  },
  {
    "id": 18,
    "nombre": "Amando",
    "apellidos": "Sanchez",
    "correo": "floresmaria-cristina@roman.com",
    "foto": "https://randomuser.me/api/portraits/men/18.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "assumenda, cumque, velit"
  },
  {
    "id": 19,
    "nombre": "Carmina",
    "apellidos": "Rosado",
    "correo": "manuelita33@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/women/19.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "debitis, nulla, odio"
  },
  {
    "id": 20,
    "nombre": "Felipe",
    "apellidos": "Isern",
    "correo": "soniatapia@botella-hoz.es",
    "foto": "https://randomuser.me/api/portraits/men/20.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "inventore, rem, molestiae"
  },
  {
    "id": 21,
    "nombre": "Evita",
    "apellidos": "Ropero",
    "correo": "tbelda@vara.com",
    "foto": "https://randomuser.me/api/portraits/women/21.jpg",
    "perfil": "Scrum Master",
    "intereses": "iste, quo, ullam"
  },
  {
    "id": 22,
    "nombre": "Chema",
    "apellidos": "Lasa",
    "correo": "emadrigal@rico-fiol.es",
    "foto": "https://randomuser.me/api/portraits/men/22.jpg",
    "perfil": "Administrador de Bases de Datos",
    "intereses": "eum, modi, accusantium"
  },
  {
    "id": 23,
    "nombre": "Chucho",
    "apellidos": "Alcaraz",
    "correo": "adelina41@lucas.es",
    "foto": "https://randomuser.me/api/portraits/women/23.jpg",
    "perfil": "QA Tester",
    "intereses": "quo, magni, numquam"
  },
  {
    "id": 24,
    "nombre": "Valentín",
    "apellidos": "Valencia",
    "correo": "ani55@baeza.com",
    "foto": "https://randomuser.me/api/portraits/men/24.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "aperiam, quasi, dolorum"
  },
  {
    "id": 25,
    "nombre": "Gabino",
    "apellidos": "Sevilla",
    "correo": "castanedaerasmo@yahoo.com",
    "foto": "https://randomuser.me/api/portraits/women/25.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "enim, in, accusamus"
  },
  {
    "id": 26,
    "nombre": "Ligia",
    "apellidos": "Salom",
    "correo": "kbarros@arco.es",
    "foto": "https://randomuser.me/api/portraits/men/26.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "explicabo, laudantium, voluptatum"
  },
  {
    "id": 27,
    "nombre": "José",
    "apellidos": "Corominas",
    "correo": "teofilo53@mariscal.es",
    "foto": "https://randomuser.me/api/portraits/women/27.jpg",
    "perfil": "Administrador de Bases de Datos",
    "intereses": "quaerat, nostrum, officiis"
  },
  {
    "id": 28,
    "nombre": "Emiliano",
    "apellidos": "Ros",
    "correo": "itziar44@ropero.org",
    "foto": "https://randomuser.me/api/portraits/men/28.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "quam, cum, enim"
  },
  {
    "id": 29,
    "nombre": "Bernardo",
    "apellidos": "Navarrete",
    "correo": "josep10@pombo-parejo.net",
    "foto": "https://randomuser.me/api/portraits/women/29.jpg",
    "perfil": "QA Tester",
    "intereses": "aliquam, ut, inventore"
  },
  {
    "id": 30,
    "nombre": "Mateo",
    "apellidos": "Ferrando",
    "correo": "ibanezmaria-dolores@gmail.com",
    "foto": "https://randomuser.me/api/portraits/men/30.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "voluptas, amet, voluptatum"
  },
  {
    "id": 31,
    "nombre": "Jose Ignacio",
    "apellidos": "Olivera",
    "correo": "agataamores@roma-feijoo.com",
    "foto": "https://randomuser.me/api/portraits/women/31.jpg",
    "perfil": "QA Tester",
    "intereses": "consectetur, magnam, odio"
  },
  {
    "id": 32,
    "nombre": "Abigaíl",
    "apellidos": "Pinedo",
    "correo": "quinterosamanta@yahoo.com",
    "foto": "https://randomuser.me/api/portraits/men/32.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "laudantium, culpa, quia"
  },
  {
    "id": 33,
    "nombre": "Jose Angel",
    "apellidos": "Mendoza",
    "correo": "nvilar@quintanilla-pomares.es",
    "foto": "https://randomuser.me/api/portraits/women/33.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "quo, earum, dolorem"
  },
  {
    "id": 34,
    "nombre": "Efraín",
    "apellidos": "Madrigal",
    "correo": "fbermejo@gmail.com",
    "foto": "https://randomuser.me/api/portraits/men/34.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "placeat, ab, nesciunt"
  },
  {
    "id": 35,
    "nombre": "Charo",
    "apellidos": "Cisneros",
    "correo": "rolandoverdu@pons.com",
    "foto": "https://randomuser.me/api/portraits/women/35.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "ab, rem, laborum"
  },
  {
    "id": 36,
    "nombre": "Duilio",
    "apellidos": "Cerdán",
    "correo": "mayollino@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/men/36.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "omnis, quos, exercitationem"
  },
  {
    "id": 37,
    "nombre": "Selena",
    "apellidos": "Cazorla",
    "correo": "rosa19@echeverria.es",
    "foto": "https://randomuser.me/api/portraits/women/37.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "sapiente, sequi, odit"
  },
  {
    "id": 38,
    "nombre": "Timoteo",
    "apellidos": "Rivera",
    "correo": "lazaroriquelme@saura.org",
    "foto": "https://randomuser.me/api/portraits/men/38.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "beatae, provident, fugiat"
  },
  {
    "id": 39,
    "nombre": "Felisa",
    "apellidos": "Abril",
    "correo": "elba02@gracia-castellanos.com",
    "foto": "https://randomuser.me/api/portraits/women/39.jpg",
    "perfil": "Ingeniero de Datos",
    "intereses": "sunt, unde, nihil"
  },
  {
    "id": 40,
    "nombre": "Moisés",
    "apellidos": "Morillo",
    "correo": "yllado@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/men/40.jpg",
    "perfil": "Scrum Master",
    "intereses": "laboriosam, esse, officiis"
  },
  {
    "id": 41,
    "nombre": "Dorotea",
    "apellidos": "Tomé",
    "correo": "wripoll@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/women/41.jpg",
    "perfil": "Desarrollador Frontend",
    "intereses": "perferendis, nam, a"
  },
  {
    "id": 42,
    "nombre": "Leocadia",
    "apellidos": "Arcos",
    "correo": "amalia85@hotmail.com",
    "foto": "https://randomuser.me/api/portraits/men/42.jpg",
    "perfil": "Scrum Master",
    "intereses": "architecto, blanditiis, ipsa"
  },
  {
    "id": 43,
    "nombre": "Palmira",
    "apellidos": "Escribano",
    "correo": "reinavalentin@pavon.es",
    "foto": "https://randomuser.me/api/portraits/women/43.jpg",
    "perfil": "Administrador de Bases de Datos",
    "intereses": "quos, facilis, commodi"
  },
  {
    "id": 44,
    "nombre": "Sol",
    "apellidos": "Rocamora",
    "correo": "talaveraserafina@yahoo.com",
    "foto": "https://randomuser.me/api/portraits/men/44.jpg",
    "perfil": "Analista de Seguridad",
    "intereses": "quasi, ipsa, quis"
  },
  {
    "id": 45,
    "nombre": "Coral",
    "apellidos": "Tomé",
    "correo": "mauricio01@guzman.com",
    "foto": "https://randomuser.me/api/portraits/women/45.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "architecto, hic, culpa"
  },
  {
    "id": 46,
    "nombre": "Elvira",
    "apellidos": "Alfonso",
    "correo": "zuritaesther@gmail.com",
    "foto": "https://randomuser.me/api/portraits/men/46.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "porro, labore, adipisci"
  },
  {
    "id": 47,
    "nombre": "Miriam",
    "apellidos": "Montaña",
    "correo": "kcasanova@yahoo.com",
    "foto": "https://randomuser.me/api/portraits/women/47.jpg",
    "perfil": "Scrum Master",
    "intereses": "magnam, quam, numquam"
  },
  {
    "id": 48,
    "nombre": "Cristian",
    "apellidos": "Osorio",
    "correo": "remediospiquer@yahoo.com",
    "foto": "https://randomuser.me/api/portraits/men/48.jpg",
    "perfil": "QA Tester",
    "intereses": "vero, consequuntur, tempora"
  },
  {
    "id": 49,
    "nombre": "Severino",
    "apellidos": "Pinilla",
    "correo": "albinoreyes@saez.com",
    "foto": "https://randomuser.me/api/portraits/women/49.jpg",
    "perfil": "Diseñador UI/UX",
    "intereses": "blanditiis, architecto, maxime"
  },
  {
    "id": 50,
    "nombre": "Zaida",
    "apellidos": "Bautista",
    "correo": "xbarco@morante.es",
    "foto": "https://randomuser.me/api/portraits/men/50.jpg",
    "perfil": "Administrador de Bases de Datos",
    "intereses": "quod, impedit, sunt"
  }
]

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

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

      setUsuarios(datosDePrueba)
      setFiltrados(datosDePrueba)
    } finally {
      setLoading(false)
    }
  }

  const filtrarUsuarios = useCallback((query) => {
    setSearchQuery(query)
    
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

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  useEffect(() => {
    console.log('Usuarios en estado:', usuarios)
    console.log('Filtrados en estado:', filtrados)
  }, [usuarios, filtrados])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        BUSCADOR DE USUARIOS
      </h1>
      
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
            {filtrados.length} usuarios encontrados
          </p>
          
          {filtrados.length === 0 ? (
            <p className="text-center text-gray-500">No se encontraron usuarios</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtrados.map((usuario) => (
                <Card key={usuario.id} usuario={usuario} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


