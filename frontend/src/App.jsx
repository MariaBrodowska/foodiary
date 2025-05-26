import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'
import SamplePlans from './pages/SamplePlans'
import DashboardPage from './pages/DashboardPage'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* publiczne */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* dla niezalogowanycyh */}
          <Route path="/login" element={
            <PublicRoute>
            <LoginPage />
            </PublicRoute>
            } />
          <Route path="/register" element={
            <PublicRoute>
            <RegisterPage />
            </PublicRoute>
            } />
          
          <Route path="/sampleplans" element={<SamplePlans />} />

          {/* chronione */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;
