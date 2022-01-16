import { useState,useEffect} from "react";
import "./company.css";
import { List } from "./List";

export function Company() {
  const [company, setcompany] = useState([]); 
  function getCompany(){
  fetch("https://stack-overflow-task.herokuapp.com/company")
    .then((data) => data.json())
    .then((user) => setcompany(user));
    
}
useEffect(()=>{getCompany()},[]);

  return (
  <div className="companylayout">
  <h6>Devolopers Carrier</h6>
    <div className="compmaincontent">
      
      {company.map((user,index) => (
        <List
          user={user} index={index}
        />
      ))}
    </div>
    </div>
  );
}

