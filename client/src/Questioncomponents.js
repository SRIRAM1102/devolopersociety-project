import { Link } from "react-router-dom";
import "./question.css";
import { useHistory } from "react-router";

export function Questioncomponents({ user, questionpage }) {
  const history = useHistory();
 

  return (
    <>
      <div className="values">
        <div className="valuesside">
          <p>
            {user.vote}<br />
            vote
          </p>
          <br />
          <p> 
            {user.answers.length}
            <br />
            answers
          </p>
        </div>
        <div className="contentside">
          <Link
            to={`question/${user._id}`}
            id="linktag"
            onClick={() => questionpage(user._id)}
          >
            {user.title}
          </Link>
          <p>{user.body}</p>
          <div className="tags">
            {user.tag.map((data) => (
              <h6 onClick={()=>history.push("/tags")}>{data}</h6>
            ))}
          </div>
        
    
        </div>
      </div>
    </>
  );
}
