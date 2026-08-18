

import editingIcon from '../assets/icons/editing.png'
import trashIcon from '../assets/icons/trash-can.png'

export const Workspace = ({name, description, onClick, onEdit, onDelete}) => {
    return (
        <div className=" flex flex-col gap-4 max-w-[310px] min-w-[270px]
         bg-greenp h-[160px] rounded-xl p-4 flex-1 hover:shadow-greenp hover:shadow-2xl cursor-pointer"
         onClick={onClick}>
            <div className="flex justify-between  border-b-fondo1 border-solid border-b text-fondo2">
                <h3 className="text-center text-lg">{name}</h3>
                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                 <img className="w-4 h-4 cursor-pointer" src={editingIcon} alt="edit-icon" onClick={onEdit} />
                 <img className="w-4 h-4 cursor-pointer" src={trashIcon} alt="trash-icon" onClick={onDelete} />
                </div>
            </div>
                <p className="text-grayp">{description}</p>


        </div>
    )
}