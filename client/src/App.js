import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { User } from "./User";
import { Question } from "./Question";
import { Tags } from "./Tags";
import { Company } from "./Company";
import { Signup } from "./signup";
import { Login } from "./login";
import { Navbar } from "./Navbar";
import {Sidebar} from "./sidebar"


function App() {
return (
    <div className="App">
      <Switch>
        <Route path="/login">    
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>

      <Navbar />
      <div className="pagedesign">
      
        <Sidebar/>
      
      <div className="layout">
        <Switch>
          <div className="mainbar">
          
            <Route path="/question">
              <Question/>
            </Route>

            <Route path="/user">
              <User/>
            </Route>

            <Route path="/tags">
              <Tags/>
            </Route>

            <Route path="/company">
              <Company />
            </Route>

            <Route path="/*">
              <Redirect to="/question" />
            </Route>
          </div>
        </Switch>
      </div>
      </div>
    </div>
  );
}

export default App;
