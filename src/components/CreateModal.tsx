import { useState } from "react";
import { createRecord } from "../lib/pocketbase";

type EditModalProps = {
  onClose: () => void;
};

export default function CreateModal({ onClose }: EditModalProps) {

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  

  const handleSubmit = () => {
    if(!name || !job){
      window.alert("Please fill all the fields");
      return;
    }
    createRecord(name,job);
    onClose();
  }
    
  return (


    <dialog className="modal" id="modal-id" open={true}>
      <div className="modal-box">
      <h3 className="font-bold text-lg m-1">Add Employee</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job</span>
          </label>
          <input type="text" placeholder="Job" className="input input-bordered" onChange={(e)=>setJob(e.target.value)} required />
        </div>
        <div className="modal-action">
          <button onClick={handleSubmit} className="btn btn-neutral">Create</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
}