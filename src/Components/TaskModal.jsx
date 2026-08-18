import { useState, useEffect } from "react"
import { X } from "lucide-react"

export const TaskModal = ({ isOpen, onClose, onSubmit, task, listName }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const isEditing = !!task

    useEffect(() => {
        if (task) {
            setTitle(task.title || "")
            setDescription(task.description || "")
        } else {
            setTitle("")
            setDescription("")
        }
        setError("")
    }, [task, isOpen])

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

        if (!title.trim()) {
            setError("Ingresa un título para la tarea")
            return
        }

        setLoading(true)
        try {
            await onSubmit({ title: title.trim(), description: description.trim() })
            setTitle("")
            setDescription("")
            onClose()
        } catch (err) {
            setError(err.message || "Error al guardar la tarea")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-ibmono">
            <div className="bg-fondo2 rounded-2xl p-6 w-[380px] shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-redblack">
                        {isEditing ? "Editar Tarea" : `Nueva Tarea${listName ? ` en ${listName}` : ""}`}
                    </h2>
                    <button type="button" onClick={onClose} className="text-grayp cursor-pointer hover:text-redblack">
                        <X size={20}/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="task-title">Título</label>
                        <input className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50"
                            type="text"
                            id="task-title"
                            placeholder="Nombre de la tarea"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[13px] font-medium text-redblack" htmlFor="task-desc">Descripción</label>
                        <textarea className="bg-greenp text-[13px] p-2 outline-none rounded-md text-amber-50 resize-none h-20"
                            id="task-desc"
                            placeholder="Describe la tarea (opcional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    {error && <p className="text-red-600 text-[13px]">{error}</p>}

                    <button className="bg-redblack px-1.5 py-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-redsecond hover:scale-101 transition-all hover:shadow-2xs hover:shadow-redsecond"
                        type="submit"
                        disabled={loading}>
                        {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Tarea"}
                    </button>
                </form>
            </div>
        </div>
    )
}
