import { useState, useEffect } from "react"
import { X } from "lucide-react"

export const ListModal = ({ isOpen, onClose, onSubmit, list }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const isEditing = !!list

    useEffect(() => {
        if (list) {
            setName(list.name || "")
            setDescription(list.description || "")
        } else {
            setName("")
            setDescription("")
        }
        setError("")
    }, [list, isOpen])

    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!name.trim()) {
            setError("Ingresa un nombre para la lista")
            return
        }

        setLoading(true)
        try {
            await onSubmit({ name: name.trim(), description: description.trim() })
            setName("")
            setDescription("")
            onClose()
        } catch (err) {
            setError(err.message || "Error al guardar la lista")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-ibmono">
            <div className="bg-fondo2 rounded-2xl p-6 w-[380px] shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-redblack">
                        {isEditing ? "Editar Lista" : "Nueva Lista"}
                    </h2>
                    <button type="button" onClick={onClose} className="text-grayp cursor-pointer hover:text-redblack">
                        <X size={20}/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="list-name">Nombre</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50"
                            type="text"
                            id="list-name"
                            placeholder="Ej: Por hacer, En progreso..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="list-desc">Descripción</label>
                        <textarea className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50 resize-none h-20"
                            id="list-desc"
                            placeholder="Describe la lista (opcional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    {error && <p className="text-red-600 text-[13px]">{error}</p>}

                    <button className="bg-redblack px-1.5 py-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-redsecond hover:scale-101 transition-all hover:shadow-2xs hover:shadow-redsecond"
                        type="submit"
                        disabled={loading}>
                        {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Lista"}
                    </button>
                </form>
            </div>
        </div>
    )
}
