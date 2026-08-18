import { useRef, useEffect, useState } from "react"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { KanbanCard } from "./KanbanCard"

export const KanbanColumn = ({ list, tasks, onAddTask, onEditTask, onDeleteTask, onEditList, onDeleteList }) => {
    const dropRef = useRef(null)
    const [isOver, setIsOver] = useState(false)

    useEffect(() => {
        const el = dropRef.current
        if (!el) return

        return dropTargetForElements({
            element: el,
            getData: () => ({ listId: list.id || list._id }),
            canDrop: ({ source }) => {
                return source.element?.dataset?.listId !== (list.id || list._id)
            },
            onDragEnter: () => setIsOver(true),
            onDragLeave: () => setIsOver(false),
            onDrop: () => setIsOver(false),
        })
    }, [list.id, list._id])

    return (
        <div className={`flex flex-col min-w-[280px] max-w-[280px] rounded-xl p-3 gap-3 transition-colors
            ${isOver ? "bg-greenp/60 ring-2 ring-greenp/80" : "bg-greenp/30"}`}>
            <div className="flex justify-between items-center border-b border-fondo1 pb-2">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-redblack">{list.name}</h3>
                    {list.description && (
                        <p className="text-[11px] text-grayp truncate mt-0.5">{list.description}</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={() => onEditList(list)}
                        className="text-grayp hover:text-greenp cursor-pointer">
                        <Pencil size={14}/>
                    </button>
                    <button type="button" onClick={() => onDeleteList(list)}
                        className="text-grayp hover:text-red-500 cursor-pointer">
                        <Trash2 size={14}/>
                    </button>
                </div>
            </div>

            <div ref={dropRef} data-list-id={list.id || list._id} className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[500px] min-h-[60px]">
                {tasks.map(task => (
                    <KanbanCard
                        key={task.id || task._id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                    />
                ))}
                {tasks.length === 0 && !isOver && (
                    <p className="text-[12px] text-grayp text-center py-4">Sin tareas</p>
                )}
                {isOver && tasks.length === 0 && (
                    <div className="border-2 border-dashed border-greenp rounded-lg py-4 text-center">
                        <p className="text-[12px] text-greenp font-medium">Soltar aquí</p>
                    </div>
                )}
            </div>

            <button type="button" onClick={() => onAddTask(list)}
                className="flex items-center justify-center gap-1 text-[13px] text-grayp hover:text-redblack cursor-pointer py-2 rounded-lg hover:bg-fondo2/50 transition-colors">
                <Plus size={14}/>
                Añadir tarea
            </button>
        </div>
    )
}
