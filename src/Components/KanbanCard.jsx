import { useRef, useEffect, useState } from "react"
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Pencil, Trash2 } from "lucide-react"

export const KanbanCard = ({ task, onEdit, onDelete }) => {
    const ref = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const taskId = task.id || task._id
    const listId = task.id_list || task.list_id

    useEffect(() => {
        const el = ref.current
        if (!el) return

        return draggable({
            element: el,
            getData: () => ({ taskId, listId }),
            onGenerateDragPreview: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        })
    }, [taskId, listId])

    return (
        <div ref={ref}
            data-task-id={taskId}
            data-list-id={listId}
            className={`bg-fondo2 rounded-lg p-3 shadow-sm border border-fondo1 transition-shadow
                ${isDragging ? "opacity-50 shadow-lg" : "hover:shadow-md cursor-grab"}`}>
            <div className="flex justify-between items-start gap-2">
                <h4 className="text-[13px] font-medium text-redblack flex-1">{task.title}</h4>
                <div className="flex gap-1 shrink-0">
                    <button type="button" onClick={() => onEdit(task)}
                        className="text-grayp hover:text-greenp cursor-pointer">
                        <Pencil size={13}/>
                    </button>
                    <button type="button" onClick={() => onDelete(task)}
                        className="text-grayp hover:text-red-500 cursor-pointer">
                        <Trash2 size={13}/>
                    </button>
                </div>
            </div>
            {task.description && (
                <p className="text-[12px] text-grayp mt-1">{task.description}</p>
            )}
        </div>
    )
}
