import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import { Navigate } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/3147253-buscador-interactivo-usuarios"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)