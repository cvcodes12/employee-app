import { Navigate } from "react-router-dom";
import pb from "../lib/pocketbase";

import TableList from "../components/TableList";
import Navbar from "../components/Navbar";



export default function Dashboard() {
  


  if (!pb.authStore.isValid) {
    return <Navigate to="/login" />;
  }



  return (
    <div>
      <Navbar/>
      <TableList/>
    </div>
  );
}
