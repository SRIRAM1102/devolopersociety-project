import { useHistory } from "react-router";

export function Navbar({ showdata }) {
  const history = useHistory();

  function logoutHandler() {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    localStorage.removeItem("carthistory");
    localStorage.removeItem("buyhistory");
    localStorage.removeItem("productdata");
    alert("account has been logout");
  }
  return (
    <div className="navbar">
      <h4 onClick={() => history.push("/")}><i>Shoptronics</i></h4>
      <div className="navbarbtn">
        <button className="cartbtn" onClick={() => showdata()}>
          🛒Cart/
          <br />
          Orders
        </button>
        <button className="cartbtn" onClick={() => logoutHandler()}>
          Logout
        </button>
      </div>
    </div>
  );
}
