import  {  deleteRecord, getList } from "../lib/pocketbase";
import { useEffect, useState } from "react";
import { RecordModel } from "pocketbase";
import CreateModal from "./CreateModal";
import { Link } from "react-router-dom";



export default function TableList() {
    const [tasks, setTasks] = useState<RecordModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading,setLoading] = useState(false)


    useEffect(()=>{
        getList().then((res)=>{
          setTasks(res);
          setLoading(false);
        }
        )
      })
      if(!tasks){
        setLoading(true)
      }
      
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if(loading){
    return(<div>Loading</div>)
  }



    

    return(
        <div>
        <div className="p-4">
            <button className="btn btn-neutral" onClick={handleOpenModal}>Create</button>
        </div>
        {isModalOpen && <CreateModal onClose={handleCloseModal}/>}
        <div className="overflow-x-auto p-4">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {tasks.map((task, index)=>(
                    <tr key={task.id}>
                        <th>{index+1}</th>
                        <td>{task.name}</td>
                        <td>{task.job}</td>
                        <td>
                            <Link to={`${task.id}`}><button className="btn btn-neutral mx-2 px-6">Edit</button></Link>

                            <button onClick={()=>deleteRecord(task.id)} className="btn btn-error mx-2">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>
    )
}