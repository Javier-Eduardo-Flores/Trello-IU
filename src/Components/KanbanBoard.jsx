import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { ArrowLeft, Plus } from "lucide-react"
import { workspaceService, listService, taskService } from "../services"
import { KanbanColumn } from "./KanbanColumn"
import { TaskModal } from "./TaskModal"
import { ListModal } from "./ListModal"
import { ConfirmModal } from "./ConfirmModal"

export const KanbanBoard = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [workspace, setWorkspace] = useState(null)
    const [lists, setLists] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [showListModal, setShowListModal] = useState(false)
    const [editingList, setEditingList] = useState(null)
    const [showTaskModal, setShowTaskModal] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    const [activeListId, setActiveListId] = useState(null)

    const [deletingList, setDeletingList] = useState(null)
    const [deletingTask, setDeletingTask] = useState(null)
    const [listDeleteLoading, setListDeleteLoading] = useState(false)
    const [listDeleteError, setListDeleteError] = useState("")
    const [taskDeleteLoading, setTaskDeleteLoading] = useState(false)
    const [taskDeleteError, setTaskDeleteError] = useState("")

    const loadDataRef = useRef(null)

    const loadData = async () => {
        try {
            setError("")

            const [wsResult, listsResult, tasksResult] = await Promise.allSettled([
                workspaceService.getById(id),
                listService.getAll(id),
                taskService.getAll(id)
            ])

            if (wsResult.status === "fulfilled") {
                setWorkspace(wsResult.value)
            } else {
                console.warn("No se pudo cargar el workspace:", wsResult.reason?.message)
            }

            const resolvedLists = listsResult.status === "fulfilled"
                ? (Array.isArray(listsResult.value) ? listsResult.value : [])
                : []
            setLists(resolvedLists.sort((a, b) => (a.id || a._id || '').localeCompare(b.id || b._id || '')))

            const resolvedTasks = tasksResult.status === "fulfilled"
                ? (Array.isArray(tasksResult.value) ? tasksResult.value : [])
                : []
            setTasks(resolvedTasks)
        } catch (err) {
            console.error("Error al cargar el tablero:", err)
            setError("Error al cargar el tablero")
        } finally {
            setLoading(false)
        }
    }

    loadDataRef.current = loadData

    useEffect(() => {
        loadData()
    }, [id])

    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const destination = location.current.dropTargets[0]
                if (!destination) return

                const sourceEl = source.element
                const taskId = sourceEl?.dataset?.taskId
                const sourceListId = sourceEl?.dataset?.listId

                const destEl = destination.element
                const destListId = destEl?.dataset?.listId

                if (!taskId || !sourceListId || !destListId) return
                if (sourceListId === destListId) return

                setTasks(prev => prev.map(t =>
                    (t.id || t._id) === taskId ? { ...t, id_list: destListId } : t
                ))
                taskService.move(id, taskId, destListId)
                    .catch(err => {
                        console.error("Error al mover la tarea:", err)
                        loadDataRef.current?.()
                    })
            }
        })
    }, [id])

    const getTasksByList = (listId) => {
        return tasks.filter(t => (t.id_list || t.list_id) === listId)
    }

    const handleCreateList = async (list) => {
        await listService.create(id, list)
        await loadData()
    }

    const handleUpdateList = async (list) => {
        await listService.update(id, editingList.id, list)
        setEditingList(null)
        await loadData()
    }

    const handleDeleteList = async () => {
        if (!deletingList) return
        setListDeleteLoading(true)
        setListDeleteError("")
        try {
            await listService.deactivate(id, deletingList.id)
            setDeletingList(null)
            await loadData()
        } catch (err) {
            setListDeleteError(err.message || "Error al eliminar la lista")
        } finally {
            setListDeleteLoading(false)
        }
    }

    const handleCreateTask = async (task) => {
        await taskService.create(id, { ...task, id_list: activeListId })
        await loadData()
    }

    const handleUpdateTask = async (task) => {
        await taskService.update(id, editingTask.id, task)
        setEditingTask(null)
        await loadData()
    }

    const handleDeleteTask = async () => {
        if (!deletingTask) return
        setTaskDeleteLoading(true)
        setTaskDeleteError("")
        try {
            await taskService.deactivate(id, deletingTask.id)
            setDeletingTask(null)
            await loadData()
        } catch (err) {
            setTaskDeleteError(err.message || "Error al eliminar la tarea")
        } finally {
            setTaskDeleteLoading(false)
        }
    }

    const openCreateTask = (list) => {
        setActiveListId(list.id)
        setEditingTask(null)
        setShowTaskModal(true)
    }

    const openEditTask = (task) => {
        setEditingTask(task)
        setShowTaskModal(true)
    }

    const openEditList = (list) => {
        setEditingList(list)
        setShowListModal(true)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-fondo2 flex items-center justify-center">
                <p className="text-grayp">Cargando tablero...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-fondo2">
            <header className="flex items-center gap-4 px-10 py-6 bg-greenp">
                <button type="button" onClick={() => navigate("/dashboard")}
                    className="text-fondo2 cursor-pointer hover:scale-110 transition-transform">
                    <ArrowLeft size={24}/>
                </button>
                <div>
                    <h1 className="font-bold text-2xl text-grayp">
                        <span className="text-redblack">GP </span>
                        {workspace?.name || "Kanvan"}
                    </h1>
                    {workspace?.description && (
                        <p className="text-[13px] text-fondo2">{workspace.description}</p>
                    )}
                </div>
            </header>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <main className="px-10 py-6 flex gap-4 overflow-x-auto">
                {lists.map(list => (
                    <KanbanColumn
                        key={list.id || list._id}
                        list={list}
                        tasks={getTasksByList(list.id || list._id)}
                        onAddTask={openCreateTask}
                        onEditTask={openEditTask}
                        onDeleteTask={(task) => setDeletingTask(task)}
                        onEditList={openEditList}
                        onDeleteList={(list) => setDeletingList(list)}
                    />
                ))}

                <button type="button" onClick={() => { setEditingList(null); setShowListModal(true) }}
                    className="flex items-center gap-2 min-w-[280px] bg-fondo1/40 hover:bg-fondo1/70 text-grayp rounded-xl p-3 cursor-pointer transition-colors h-fit">
                    <Plus size={16}/>
                    <span className="text-[13px] font-medium">Añadir lista</span>
                </button>
            </main>

            <ListModal
                isOpen={showListModal}
                onClose={() => { setShowListModal(false); setEditingList(null) }}
                onSubmit={editingList ? handleUpdateList : handleCreateList}
                list={editingList}
            />

            <TaskModal
                isOpen={showTaskModal}
                onClose={() => { setShowTaskModal(false); setEditingTask(null); setActiveListId(null) }}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                task={editingTask}
                listName={lists.find(l => (l.id || l._id) === (editingTask?.id_list || activeListId))?.name || ""}
            />

            <ConfirmModal
                isOpen={!!deletingList}
                onClose={() => { setDeletingList(null); setListDeleteError("") }}
                onConfirm={handleDeleteList}
                title="Eliminar lista"
                message={`¿Estás seguro de eliminar "${deletingList?.name}" y todas sus tareas? Esta acción no se puede deshacer.`}
                loading={listDeleteLoading}
                error={listDeleteError}
            />

            <ConfirmModal
                isOpen={!!deletingTask}
                onClose={() => { setDeletingTask(null); setTaskDeleteError("") }}
                onConfirm={handleDeleteTask}
                title="Eliminar tarea"
                message={`¿Estás seguro de eliminar "${deletingTask?.title}"? Esta acción no se puede deshacer.`}
                loading={taskDeleteLoading}
                error={taskDeleteError}
            />
        </div>
    )
}
