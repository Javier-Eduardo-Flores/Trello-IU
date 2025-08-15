import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({children}) =>{
    const {isAuthenticated ,loading} = useAuth()

    if(loading){
        return (
            // Hacer el componente o Html de carga
            <p>cargando</p>
        )
    }

    if(isAuthenticated){
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default PublicRoute