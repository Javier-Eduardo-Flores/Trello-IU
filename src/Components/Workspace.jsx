

export const Workspace = ({name,description}) => {
    return (
        <div className=" flex flex-col gap-4 max-w-[310px] min-w-[270px]
         bg-greenp h-[160px] rounded-xl p-4 flex-1 hover:shadow-greenp hover:shadow-2xl">
            <div className="flex justify-between  border-b-fondo1 border-solid border-b text-fondo2">
                <h3 className="text-center text-lg cursor-pointer">{name}</h3>
                <div className="flex gap-3">
                 <img className="w-4 h-4 cursor-pointer" src="../public/icons/editing.png" alt="edit-icon" />
                 <img className="w-4 h-4 cursor-pointer" src="../public/icons/trash-can.png" alt="trash-icon" />
                </div>
            </div>
                <p className="text-grayp">{description}</p>
            
           
        </div>
    )
}