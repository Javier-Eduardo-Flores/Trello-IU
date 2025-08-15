import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) =>{
    const {isAuthenticated ,loading} = useAuth()

    if(loading){
        return (
            // Hacer el componente o Html de carga
            <p>cargando</p>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute