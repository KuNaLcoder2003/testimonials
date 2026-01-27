

import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ProtectedRoute from './components/ProtectedRoute'
import { UserProvider } from './context/UserContext'
import Collect from './pages/Collect'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/testify/:space' element={<Collect />} />
      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <UserProvider>
              <Dashboard />
            </UserProvider>
          </ProtectedRoute>} />



    </Routes>
  )
}

export default App
