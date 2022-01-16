import { useState, useEffect } from "react";
import "./user.css";

export function User() {
  const [usersdata, setusersdata] = useState([]);
  function getUser() {
    fetch("https://stack-overflow-task.herokuapp.com/user")
      .then((data) => data.json())
      .then((user) => setusersdata(user));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h6 className="userheader">Users</h6>
      <div className="detailcontent">
        {usersdata.map((user, index) => (
          <Detailsuser user={user} index={index} />
        ))}
      </div>
    </div>
  );
}

function Detailsuser({ user }) {
  let name = user.name.slice(0, 1);

  return (
    <div className="details">
      <div className="useravatar">{name}</div>
      <div className="usercontent">
        <h6 className="username">{user.name}</h6>
        <p>{user.country}</p>
        <h6>{user.createdat}</h6>
      </div>
    </div>
  );
}
