import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Signup.css";

export function Login() {
  const history = useHistory();
  function handleLoginEvent(e) {
    e.preventDefault();
    
   
    fetch("https://ecommerce-sriram.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: e.target[0].value,
        password: e.target[1].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => getElements(data))
  }
  function getElements(data) {
    if (!data.msg) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.id);
      localStorage.setItem("carthistory",JSON.stringify(data.cartitem));
      localStorage.setItem("buyhistory",JSON.stringify(data.buyitem))
      history.push("/");
    } else alert(data.msg);
  }

  return (
    <div className="welcomelayout">
      <form onSubmit={handleLoginEvent}>
      
        <label htmlFor="EmailId" /> <span>*</span> EmailId:
        <br />
        <input type="email" name="EmailId" id="EmailId" required />
        <br />
        <br />
        <label htmlFor="Password" /> <span>*</span> Password:
        <br />
        <input type="password" name="Password" id="Password" required />
        <br />
        <br />
        <h6>
          New user?<Link to="/signup">Signup</Link>
        </h6>
     <button type="submit">Submit</button>
     <button> <Link to="/">Back to home</Link></button>
      </form>
    </div>
  );               
}
   