import "./fullvalue.css";
import "./question.css";
import { useState,useEffect} from "react";
import { useHistory } from "react-router";
import moment from "moment";

export function Questionpage({submitqnsanswerhandler,singlqns,getQuestions}) {
  console.log(getQuestions)
  const history = useHistory();
 const [userqdata, setuserqdata] = useState([]);
 const[content,setcontent]=useState([]);
 const[update,setupdate]=useState(false);
 const [data] = JSON.parse(sessionStorage.getItem("questiondata"));
 const [userqns] = JSON.parse(sessionStorage.getItem("user")).filter((user) => user._id === data.createdby);
 let ans=data.answers;
 let name=userqns.name.slice(0,1);


 function votehandler(vote) {
    if(!sessionStorage.getItem("token")) 
    {  
      history.push("/login");
    }
    else{
     const votedata = data.votersid.filter((user) => user==sessionStorage.getItem("userid") );
      
      if(votedata.length==0){
        fetch("https://stack-overflow-task.herokuapp.com/question/vote", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:data._id,
            vote:vote+1,
            userid: sessionStorage.getItem("userid")
          }), 
        });
        setupdate(true);
            alert("added");
            history.push("/question");
            getQuestions();
      }
      else{
        alert("one vote per question");

      }
  
  }
}
     

  return (
    <div className="questionpage-content">
      <div className="votesside">

<p onClick={()=>votehandler(data.vote)}>▲</p>
<p>{update ? data.vote+1 : data.vote}</p>
<p>	▼</p>


      </div>
      <div className="contentside-qns">
      <h6>{data.title}</h6>
    <br/>
      <p>{data.body}</p>
      <div className="questiontags">
     {data.tag.map((data) => (
              <h6 onClick={()=>history.push("/tags")}>{data}</h6>
            ))}
            </div>
      <h5>asked {data.time}</h5>
      <div className="userqnsdetails ">
      <div className="useravatarhome">{name}</div>
        <h6>{userqns.name}</h6>
     
     </div>
   
     <h4>{ans.length} answers</h4>
      {data.answers.map((data, index) => (
        <Answers index={index} data={data}  />
      ))}
      <form onSubmit={submitqnsanswerhandler}>
        <label htmlFor="youranswer" /> Your Answer
        <br />
        <br />
        <textarea id="ansbody" name="ansbody" rows="13" cols="90"  placeholder="Type your answer here..."/>
        <br />
        <br />
        <button type="submit">Post your answers</button>
      </form>
      </div>
    </div>
  );
}

function Answers({ data,index }) {
  const [user] =JSON.parse(sessionStorage.getItem("user")).filter((user) => user._id == data.userid);
  let name=user.name.slice(0,1);
  return (
    <div id="answerframe">
     
      <div className="answercomponent">
        <h5>{index+1}</h5>
        <p>{data.answer}</p>
        <br />
        <br />
      </div>
      <p className="description">answerd {data.time}</p>
      <div className="userqnsdetails">
      <div className="useravatarhome">{name}</div>
        <h6>{user.name}</h6>
         </div>
      <hr />
    </div>
  );
}
