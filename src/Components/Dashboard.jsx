import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Workspace } from "./Workspace"
import { CreateWorkspaceModal } from "./CreateWorkspaceModal"
import { EditWorkspaceModal } from "./EditWorkspaceModal"
import { ConfirmModal } from "./ConfirmModal"
import { useEffect, useState } from "react"
import { workspaceService } from "../services"

export const Dashboard  = () => {
const [workspaces,SetWorkspace] = useState([])
const {validateToken} = useAuth()

const [loading,setLoading] = useState(true)
const [error, setError] = useState('');
const [showCreateModal, setShowCreateModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [editingWorkspace, setEditingWorkspace] = useState(null);
const [deletingWorkspace, setDeletingWorkspace] = useState(null);
const [deleteLoading, setDeleteLoading] = useState(false);
const [deleteError, setDeleteError] = useState("");
const navigate = useNavigate()
const {user,logout} = useAuth()

const handleLogout = () => {
    logout()
    navigate("/login");
}

useEffect(() => {
        loadWorkspace();
    }, []);

const loadWorkspace = async () => {

    if (!validateToken()) {
        return;
    }

    try{
        setLoading(true);
        setError("");
        const workspaceData = await workspaceService.getAll();
        const list = Array.isArray(workspaceData) ? workspaceData : [];
        SetWorkspace(list);

    }catch(err){
        console.error("Error al cargar los workspaces:", err);
        setError("Error al cargar los workspaces. Por favor, inténtalo de nuevo más tarde.");
    }finally{
        setLoading(false);
    }
}

const handleCreateWorkspace = async (workspace) => {
    await workspaceService.create(workspace)
    await loadWorkspace()
}

const handleUpdateWorkspace = async (workspace) => {
    await workspaceService.update(editingWorkspace.id, workspace)
    setEditingWorkspace(null)
    await loadWorkspace()
}

const handleDeleteWorkspace = async () => {
    if (!deletingWorkspace) return
    setDeleteLoading(true)
    setDeleteError("")
    try {
        await workspaceService.deactivate(deletingWorkspace.id)
        setDeletingWorkspace(null)
        await loadWorkspace()
    } catch (err) {
        setDeleteError(err.message || "Error al eliminar el workspace")
    } finally {
        setDeleteLoading(false)
    }
}

    return (
        <>
        <div className="min-h-screen bg-fondo2 ">
            <header className="flex justify-between px-10 py-8 bg-greenp items-center">
                <div className="flex flex-col">
                    <h1 className=" font-bold text-2xl text-grayp">
                            <span className="text-redblack">GP </span>
                               Kanvan
                             </h1>
                    <h2 className="font-bold text-fondo2">Tu Gestor de Proyectos</h2>
                </div>
                 <button className="bg-redblack px-1.5 py-2 mt-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-redsecond hover:scale-101 transition-all hover:shadow-2xs hover:shadow-redsecond" 
                 type="button"
                 name="cerrar sesión" 
                 onClick={handleLogout}
                 >
                        Cerrar Sesión
                    </button>
            </header>
            <main className="flex flex-col px-10 mt-10 py-4">
                <section className=" flex justify-between py-4 border-b-grayp border-solid border-b" name="encabezado">
                    <h3 className="text-2xl font-bold text-redsecond">
                        Espacios de Trabajo de  
                        <span className="text-greenp"> {user?.name}</span>
                    </h3>
                    <button className="bg-[#48664F] px-1.5 py-2 mt-2 rounded-md text-[14px] text-fondo2 font-bold cursor-pointer hover:bg-[#597D61] hover:scale-101 transition-all hover:shadow-2xs hover:shadow-[#48664F]" 
                 type="button" 
                 name="nuevo workspace"
                 onClick={() => setShowCreateModal(true)}
                 >
                        Nuevo workspace
                    </button>
                </section>
             
                
                <section className="flex flex-wrap py-8 gap-4" name="workspace">
                    {loading && <p className="text-center text-gray-500">Cargando workspaces...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {workspaces.length === 0 && !loading && <p className="text-center text-gray-500">Crea tus nuevos workspaces</p>}
                    
                    {workspaces?.map((workspace) => (
                        <Workspace 
                            key={workspace.id} 
                            name={workspace.name} 
                            description={workspace.description}
                            onClick={() => navigate(`/workspace/${workspace.id}`)}
                            onEdit={() => { setEditingWorkspace(workspace); setShowEditModal(true) }}
                            onDelete={() => setDeletingWorkspace(workspace)}
                        />
                    ))}
                </section>
            </main>
        </div>
        <CreateWorkspaceModal 
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateWorkspace}
        />
        <EditWorkspaceModal 
            isOpen={showEditModal}
            onClose={() => { setShowEditModal(false); setEditingWorkspace(null) }}
            onSubmit={handleUpdateWorkspace}
            workspace={editingWorkspace}
        />
        <ConfirmModal
            isOpen={!!deletingWorkspace}
            onClose={() => { setDeletingWorkspace(null); setDeleteError("") }}
            onConfirm={handleDeleteWorkspace}
            title="Eliminar workspace"
            message={`¿Estás seguro de eliminar "${deletingWorkspace?.name}"? Se eliminarán todas las listas y tareas asociadas. Esta acción no se puede deshacer.`}
            loading={deleteLoading}
            error={deleteError}
        />
        </>
    )
}