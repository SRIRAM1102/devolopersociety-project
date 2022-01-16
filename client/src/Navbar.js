import { Link } from "react-router-dom";
import "./navbar.css";
import { useHistory } from "react-router";

export function Navbar() {
  const history = useHistory();
  function logouthandler() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("questiondata");
    alert("account has been logout"); 
    history.push("./question");
    window.location.reload(); 
  }
  return ( 
    <div>
      <div className="navbar">
        <p className="siteheading" onClick={()=>history.push("/question")}>
          Devolopers<b>Society</b>
        </p>

    

        {sessionStorage.getItem("token") ? (
      <button onClick={() => logouthandler()} className="navbtn">Logout</button>
     
      ) : (
          <div className="credentials">
        <button onClick={()=>  history.push("/login")} className="navbtn">
           Login
          </button>
            <button onClick={()=>  history.push("/signup")} className="navbtn signup">
            Signup
           </button>
           </div>
      )}
        
      </div>
    </div>
  );
}
