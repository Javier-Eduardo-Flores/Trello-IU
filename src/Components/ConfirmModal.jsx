import { useEffect } from "react"
import { X, AlertTriangle } from "lucide-react"

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Eliminar", loading = false, error = "" }) => {
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-ibmono">
            <div className="bg-fondo2 rounded-2xl p-6 w-[400px] shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-redsecond/15 p-2 rounded-full">
                            <AlertTriangle size={20} className="text-redsecond"/>
                        </div>
                        <h2 className="text-lg font-bold text-redblack">{title}</h2>
                    </div>
                    <button type="button" onClick={onClose}
                        className="text-grayp cursor-pointer hover:text-redblack">
                        <X size={20}/>
                    </button>
                </div>

                <p className="text-[13px] text-grayp mb-2 ml-[44px]">{message}</p>

                {error && (
                    <p className="text-[13px] text-red-600 mb-4 ml-[44px] bg-red-50 p-2 rounded-md">{error}</p>
                )}

                <div className="flex gap-3 justify-end mt-4">
                    <button type="button" onClick={onClose}
                        className="px-4 py-2 rounded-md text-[13px] font-medium text-redblack bg-fondo1/50 cursor-pointer hover:bg-fondo1/80 transition-colors">
                        Cerrar
                    </button>
                    {!error && (
                        <button type="button" onClick={onConfirm} disabled={loading}
                            className="px-4 py-2 rounded-md text-[13px] font-bold text-fondo2 bg-redsecond cursor-pointer hover:bg-red-700 transition-colors disabled:opacity-50">
                            {loading ? "Eliminando..." : confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
