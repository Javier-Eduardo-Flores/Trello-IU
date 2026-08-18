import { useState, useEffect } from "react"
import { X } from "lucide-react"

export const CreateWorkspaceModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleClose = () => {
        setName("")
        setDescription("")
        setError("")
        onClose()
    }

    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setName("")
                setDescription("")
                setError("")
                onClose()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!name.trim()) {
            setError("Ingresa un nombre para el workspace")
            return
        }

        setLoading(true)
        try {
            await onSubmit({ name: name.trim(), description: description.trim() })
            setName("")
            setDescription("")
            onClose()
        } catch (err) {
            setError(err.message || "Error al crear el workspace")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-ibmono">
            <div className="bg-fondo2 rounded-2xl p-6 w-[380px] shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-redblack">Nuevo Workspace</h2>
                    <button type="button" onClick={handleClose} className="text-grayp cursor-pointer hover:text-redblack">
                        <X size={20}/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="ws-name">Nombre</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50"
                            type="text"
                            id="ws-name"
                            placeholder="Mi workspace"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="ws-desc">Descripción</label>
                        <textarea className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50 resize-none h-20"
                            id="ws-desc"
                            placeholder="Describe tu workspace (opcional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    {error && <p className="text-red-600 text-[13px]">{error}</p>}

                    <button className="bg-redblack px-1.5 py-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-redsecond hover:scale-101 transition-all hover:shadow-2xs hover:shadow-redsecond"
                        type="submit"
                        disabled={loading}>
                        {loading ? "Creando..." : "Crear Workspace"}
                    </button>
                </form>
            </div>
        </div>
    )
}
