import { Link } from "react-router-dom";
import "./sidebar.css"

export function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarcontent">
            <Link to="/question" className="linktagside">Home</Link>
            <p>PUBLIC</p>
            <div className="innerdetails">
            <Link to="/question" className="linktagside leftside">Question</Link><br/><br/>
            <Link to="/Tags" className="linktagside leftside">Tags</Link><br/><br/>
            <Link to="/user" className="linktagside leftside">User</Link><br/><br/>
            </div>
            <p>FIND A JOB</p>
            <div className="innerdetails">
            <Link to="/company" className="linktagside leftside">Company</Link>
            </div>
            <p>COLLECTIVES</p>
            <div className="innerdetails">
            <p className="leftside">EXPLORE </p>
            </div>
            </div>
        
        </div>
    );
}