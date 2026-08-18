import { Dashboard } from './Components/Dashboard'
import { KanbanBoard } from './Components/KanbanBoard'
import './App.css'
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
                <Route path='/workspace/:id'  element={
                        <ProtectedRoute>
                              <KanbanBoard/>
                        </ProtectedRoute>
                }/>
                <Route path='/signup'  element={
                  <PublicRoute>
                    <SignUpScreen/>
                  </PublicRoute>
                }/>
                <Route path='*' element={<Navigate to="/login" replace />} />

             </Routes>
           </div>
        </Router>
   </AuthProvider>
  )
} 

export default App
