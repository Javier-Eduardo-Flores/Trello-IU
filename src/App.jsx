import { useState } from 'react'
import { Dashboard } from './Components/Dashboard'
import './App.css'
import './index.css'
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
import PublicRoute from './Components/PublicRoute'
import { LoginScreen } from './Components/LoginScreen'
import { SignUpScreen } from './Components/SignUpScreen'
function App() {

  return (
    <AuthProvider>
        <Router>
           <div className='App'>
             <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login'  element={
                  <PublicRoute>
                      <LoginScreen  />
                  </PublicRoute>
                }
                  />   


                <Route path='/dashboard'  element={
                        <ProtectedRoute>
                              <Dashboard/>
                        </ProtectedRoute>
                }/>
                <Route path='/signup'  element={
                        
                              <SignUpScreen/>
                        
                }/>

             </Routes>
           </div>
        </Router>
   </AuthProvider>
  )
} 

export default App
