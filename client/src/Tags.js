import "./tags.css";
import { useState, useEffect } from "react";

export function Tags() {
  const [tagdata, settagdata] = useState([]);
  function getUser() {
    fetch("https://stack-overflow-task.herokuapp.com/tags")
      .then((data) => data.json())
      .then((user) => settagdata(user));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div id="tags">
      <h6>Tags</h6>
      <p>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>

      <div className="detailcontent-tags">
        {tagdata.map((user, index) => (
          <Detailstag user={user} index={index} />
        ))}
      </div>
    </div>
  );
}

function Detailstag({ user }) {
  const descriptions =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu venenatis diam, in rutrum augue. Nullam vel urna fringilla diam convallis sodales. ";
  return (
    <div className="tagsdetails">
      <h6>{user}</h6>
      <p>{descriptions}</p>
    </div>
  );
}
