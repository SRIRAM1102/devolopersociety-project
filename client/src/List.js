import locations from "./images/location.png";
import job from "./images/job.png";
import "./company.css";

export function List({ user,index }) {
  return (
    <div className="companies">
      <div> 
        <img src={user.logo} alt="img" className="companyimg" />
      </div>
      <div className="compdescription">
        <h6 className="companiestitle"><a href={user.url} target="_blank">{user.company}</a> </h6>
       <div className="abtcompany">
        <img src={locations} alt="icon" />
            <h6> {user.location} </h6>
            <img src={job} alt="icon" />
           <h6> {user.field}  </h6>   
           </div>
        
        <p>{user.description}</p>
      </div>
    </div>
  );
}
