import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecordById, updateRecord } from "../lib/pocketbase";

export default function EditData() {
    const {dataId,id} = useParams();
  const [nameNew, setName] = useState("");
  const [jobNew, setJob] = useState("");
  const navigate = useNavigate();
 useEffect(() => {
    async function fetchData() {
        if(dataId){

            const record = await getRecordById(dataId);
            if (record) {
              
              setName(record.name);
              setJob(record.job);
            }
        }
    }
    fetchData();
  }, [dataId]);

  const handleSubmit = () => {
    if(!nameNew || !jobNew){
          window.alert("Please fill all the fields");
          return;
        }
        if(dataId)
        updateRecord(dataId,nameNew,jobNew);
        navigate('..')


  }
  
  
 
  
  
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="border p-4 w-96 m-10 rounded-lg shadow-md">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={nameNew}
              placeholder="Name"
              className="input input-bordered"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job</span>
            </label>
            <input
              type="text"
              value={jobNew}
              placeholder="Job"
              className="input input-bordered"
              onChange={(e) => setJob(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center p-4 gap-4">
              <button onClick={handleSubmit} className="btn btn-neutral">Edit</button>
              <Link to={`/dashboard/${id}`} className="btn ">Cancel</Link>
          </div>
        </div>
      </div>
    </>
  );
}
