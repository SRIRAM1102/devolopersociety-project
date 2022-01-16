import { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import { Askquestion } from "./Askquestion";
import { Questioncomponents } from "./Questioncomponents";
import { Questionpage } from "./questionpage";
import "./question.css";
import { useHistory } from "react-router";
import moment from "moment";

export function Question() {
  let { path, url } = useRouteMatch();
  const [question, setquestion] = useState([]);
  const history = useHistory();
  const [singlqns, setsingleqns] = useState([]);

  //Get Questions
  function getQuestions() {
    fetch("https://stack-overflow-task.herokuapp.com/question")
      .then((data) => data.json())
      .then((data) => getItem(data));
    function getItem(data) {
      setquestion(data.result);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
  }
  useEffect(() => {
    getQuestions();
  }, []);

  //Singlepg Qns
  function questionpage(id) {
    sessionStorage.setItem(
      "questiondata",
      JSON.stringify(question.filter((user) => user._id == id))
    );
    sessionStorage.setItem("questionid", id);

    setsingleqns(question.filter((user) => user._id == id));
  }

  //Update Answer
  function submitqnsanswerhandler(event) {
    event.preventDefault();
    if (!sessionStorage.getItem("token")) {
      history.push("/login");
    } else {
      fetch("https://stack-overflow-task.herokuapp.com/question/answers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Acess-Control-Allow-Orgin": "*",
        },
        body: JSON.stringify({
          answer: event.target[0].value,
          questionid: window.location.pathname.split("/")[2],
          userid: sessionStorage.getItem("userid"),
          moment: moment().format("MMM DD YY @ h:mm"),
        }),
      });

      questionpage(sessionStorage.getItem("questionid"));
      alert("Answer added sucessfully");
      history.push("/question");
      getQuestions();
    }
  }

  //Post Question
  function submitanswerhandler(event) {
    event.preventDefault();
    // https://stack-overflow-task.herokuapp.com/question
    fetch("http://localhost:3002/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target[0].value,
        body: event.target[1].value,
        tags: event.target[2].value.split(","),
        userid: sessionStorage.getItem("userid"),
        moment: moment().format("MMM DD YY @ h:mm"),
      }),
    });
    alert("Question added sucessfully");
    history.push("/question");
    getQuestions();
  }
  return (
    <div id="mainlayout">
      <Switch>
        <Route exact path={path}>
          <div className="questionlayout">
            <h6>All Questions</h6>
            <button>
              <Link to={`${url}/askquestion`} id="linktag">
                Ask Question
              </Link>
            </button>
          </div>
          <h5>{question.length} questions</h5>
          <div className="questioncontent">
            {question.map((user, index) => (
              <Questioncomponents
                user={user}
                questionpage={questionpage}
                index={index}
              />
            ))}
          </div>
        </Route>

        <Route path={`${path}/askquestion`}>
          {sessionStorage.getItem("token") ? (
            <Askquestion submitanswerhandler={submitanswerhandler} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path={`${path}/:id`}>
          <Questionpage
            singlqns={singlqns}
            submitqnsanswerhandler={submitqnsanswerhandler}
            getQuestions={getQuestions}
          />
        </Route>
      </Switch>
    </div>
  );
}
