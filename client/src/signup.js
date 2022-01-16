import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Signup.css";
import moment from "moment";

export function Signup() {
  const historys = useHistory();
  function handleSigupEvent(e) {
    e.preventDefault();
    let password = e.target[3].value;
    let confirmPassword = e.target[4].value;

    if (password != confirmPassword) {
      alert("password doesnot match");
    } else {
      fetch("https://stack-overflow-task.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: e.target[0].value,
          country: e.target[1].value,
          emailId: e.target[2].value,
          userPassword: password,
          createdat: moment().format(" DD MMM YY"),
        }),
      })
        .then((response) => response.json())
        .then((data) => nextSteps(data));

      function nextSteps(data) {
        if (data.msg) {
          alert(data.msg);
        } else if (data.sucess) {
          historys.push("/login");
        }
      }
    }
  }
  return (
    <div className="welcomelayout">
      <form onSubmit={handleSigupEvent}>
        <label htmlFor="userName">
          {" "}
          <span>*</span> Username:
        </label>{" "}
        <br />
        <input type="text" name="userName" id="userName" required />
        <br />
        <br />
        <label htmlFor="country">
          {" "}
          <span>*</span> Country:
        </label>{" "}
        <br />
        <input type="text" name="country" id="country" required />
        <br />
        <br />
        <label htmlFor="EmailId">
          <span>*</span> EmailId:
        </label>
        <br />
        <input type="email" name="EmailId" id="EmailId" required />
        <br />
        <br />
        <label htmlFor="Password">
          {" "}
          <span>*</span> Password:
        </label>
        <br />
        <input type="password" name="Password" id="Password" required />
        <br />
        <br />
        <label htmlFor="ConfirmPasword">
          {" "}
          <span>*</span> ConfirmPasword:
        </label>
        <br />
        <input
          type="password"
          name="ConfirmPasword"
          id="ConfirmPasword"
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
        <h6>
          Already having an account?
          <Link to="/login" className="linkbar">
            Login
          </Link>
        </h6>
      </form>
    </div>
  );
}
