import { useNavigate } from "react-router-dom";
import pb, {   signout } from "../lib/pocketbase";


export default function Navbar() {
    const navigate = useNavigate();

    const handleSignout = () => {
      navigate("/login");
      signout();
    };
    return(
        <div>
            <div className="navbar bg-base-200 p-4 w-screen">
        <a className="navbar-start font-semibold text-xl">EMPLOYEE DATA</a>
        <h1 className="navbar-end mx-4">{pb.authStore.record?.email}</h1>
        <button className="btn btn-neutral mx-4" onClick={handleSignout}>
          Sign out
        </button>
      </div>
      
        </div>
    )
}