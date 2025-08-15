import { useState } from "react"
import { Navigate, useNavigate, Link} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { validatePassword, isValidEmail,getPasswordStrength } from "../utils/validator"
export const SignUpScreen = () => {
    const [formData,setFormData] = useState(
        {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    )
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register } = useAuth(); 
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (error) setError('');
    };

    const  handleSignUp = async () => {

        if (isSubmitting) {
            return;
        }
        
        setError("");
        setSuccess("");
        setIsSubmitting(true);

        if(!formData.name.trim()){
            setError("Ingresa un nombre")
            setIsSubmitting(false);
        }

         if(!formData.email.trim()){
            setError("Ingresa un correo")
            setIsSubmitting(false);
        }

         if(!formData.password.trim()){
            setError("Ingresa una contraseña")
            setIsSubmitting(false);
        }
         if(!formData.confirmPassword.trim()){
            setError("Ingresa tu confirmacion de contraseña")
            setIsSubmitting(false);
        }

        if(!isValidEmail(formData.email)){
            setError("Por favor ingresa un email valido")
            setIsSubmitting(false);
        }

        const passwordValidation = validatePassword(formData.password);
        if(!passwordValidation.isValid){
            setError(passwordValidation.message)
            setIsSubmitting(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await register(formData.name,formData.email, formData.password);
            if (result) {
                setSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');

                // Limpiar formulario
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });


                navigate('/login', { replace: true });
            }
        }catch (error) {
            console.error('Error en registro:', error);
            setError(error.message || 'Error al crear la cuenta. Intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
        
    }

     return(
        <div className="min-h-screen flex items-center bg-greenp justify-center font-ibmono">
             <div className="flex flex-col items-center bg-fondo2 justify-center rounded-3xl py-8 px-4 w-[400px] shadow-lg shadow-grayp">
                <div className="flex flex-col justify-center items-center py-2">
                        <h1 className=" font-bold text-2xl text-grayp">
                            <span className="text-redblack">GP </span>
                               Kanvan
                             </h1>

                        <h3 className="text-sm text-greenp font-medium">Registro</h3>
                </div>


                <form className="flex flex-col py-2 gap-4 w-[300px]" id="form-SignUp" noValidate>

                     <div className="flex flex-col">   
                        <label className="text-[13px] font-medium text-redblack" htmlFor="SignUp">Nombre</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50" 
                        type="text" 
                        placeholder="Tu nombre de usuario" 
                        id="name"
                        name ="name"
                        value={formData.name}
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="flex flex-col">   
                        <label className="text-[13px] font-medium text-redblack" htmlFor="SignUp">Email</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50" 
                        type="email" 
                        placeholder="email@gmail.com" 
                        id="email"
                        name = "email"
                        value={formData.email}
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="SignUp">Contraseña</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50" 
                        type="password" placeholder="***********" 
                        id="password"
                        name = "password"
                        value={formData.password}
                        onChange={handleChange}
                        required/>

                         {formData.password && (
                            <div className="mt-2">
                                <div className="text-xs text-gray-600 mb-1">Requisitos de contraseña:</div>
                                <div className="space-y-1">
                                    {(() => {
                                        const strength = getPasswordStrength(formData.password);
                                        return (
                                            <>
                                                <div className={`text-xs flex items-center ${strength.isValidLength ? 'text-green-600' : 'text-gray-400'}`}>
                                                    <span className="mr-1">{strength.isValidLength ? '✓' : '○'}</span>
                                                    8-64 caracteres
                                                </div>
                                                <div className={`text-xs flex items-center ${strength.hasUppercase ? 'text-green-600' : 'text-gray-400'}`}>
                                                    <span className="mr-1">{strength.hasUppercase ? '✓' : '○'}</span>
                                                    Al menos una mayúscula
                                                </div>
                                                <div className={`text-xs flex items-center ${strength.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                                                    <span className="mr-1">{strength.hasNumber ? '✓' : '○'}</span>
                                                    Al menos un número
                                                </div>
                                                <div className={`text-xs flex items-center ${strength.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                                                    <span className="mr-1">{strength.hasSpecialChar ? '✓' : '○'}</span>
                                                    Carácter especial (@$!%*?&)
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="SignUp">Confirmar Contraseña</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50" 
                        type="password" placeholder="***********" 
                        id="confirmPassword"
                        name = "confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required/>
                    </div>
                   
                    <button className="bg-redblack px-1.5 py-2 mt-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-redsecond hover:scale-102 transition-all hover:shadow-2xs hover:shadow-redsecond" 
                    type="button" 
                    onClick={handleSignUp}
                    disabled = {isSubmitting}

                    >{isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}</button>
                    
                </form>

                <div className="footer flex gap-2 py-2">
                        <p className="text-[13px]">¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="text-[13px] text-sky-500" >¡Inicia Sesión!</Link>
                </div>

                     {/* Mensajes de error y éxito */}
                 {error && (
                    <div className={`mb-4 p-3 rounded-md border ${
                        error.includes('email ya está registrado') || error.includes('usuario ya existe')
                            ? 'bg-orange-100 border-orange-400 text-orange-700'
                            : 'bg-red-100 border-red-400 text-red-700'
                    }`}>
                        <div className="flex items-center">
                            <span className="mr-2">
                                {error.includes('email ya está registrado') || error.includes('usuario ya existe')
                                    ? '⚠️'
                                    : '❌'
                                }
                            </span>
                            <span>{error}</span>
                        </div>
                        {(error.includes('email ya está registrado') || error.includes('usuario ya existe')) && (
                            <div className="mt-2 text-sm">
                                <Link to="/login" className="text-pink-600 hover:text-pink-700 underline">
                                    ¿Ya tienes cuenta? Inicia sesión aquí
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        <div className="flex items-center">
                            <span className="mr-2">✅</span>
                            <span>{success}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}