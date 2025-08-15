import { useState } from "react"
import { Navigate, useNavigate, Link} from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const LoginScreen = ()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)

        try{
            await login(email, password);
            navigate("/dashboard")

        }catch(err){
            console.error("Error al iniciar sesión:", err);
            navigate("/login");
            alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }finally {
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen flex items-center bg-greenp justify-center font-ibmono">
             <div className="flex flex-col items-center bg-fondo2 justify-center rounded-3xl py-8 px-4 w-[350px] shadow-lg shadow-grayp">
                <div className="flex flex-col justify-center items-center py-2">
                        <h1 className=" font-bold text-2xl text-grayp">
                            <span className="text-redblack">GP </span>
                               Kanvan
                             </h1>

                        <h3 className="text-sm text-greenp font-medium">Inicia Sesión</h3>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col py-2 gap-3 w-[250px]">

                    <div className="flex flex-col">   
                        <label className="text-[13px] font-medium text-redblack" htmlFor="email">Email</label>

                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50" 
                        type="email" id="email" 
                        placeholder="email@gmail.com" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="password">Contraseña</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50" 
                        type="password" placeholder="***********"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        id="passport"
                         required/>
                    </div>
                   
                    <button className="bg-redblack px-1.5 py-2 mt-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-redsecond hover:scale-101 transition-all hover:shadow-2xs hover:shadow-redsecond" type="submit" disabled ={loading}>
                        {loading ? "Iniciando Sesión...": "Iniciar Sesión"}
                    </button>
                    
                </form>

                <div className="footer flex gap-2 py-2">
                    <p className="text-[13px]">¿No tienes una cuenta?</p>
                    <Link to="/signup" className="text-[13px] text-sky-500" >¡Registrate aqui!</Link>
                </div>
            </div>

        </div>
        
      
    )
}