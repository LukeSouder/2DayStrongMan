import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MainNavigation from "./Navigation/MainNavigation";
import Login from "./Navigation/components/Login";
import Day1 from "./Navigation/components/Day1";
import Day2 from "./Navigation/components/Day2"; 


function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <div className="homepage">
              <h2>Home Page</h2>
              <h4>
                This is a 2-day workout that should be done 3 times per week.
                <br />
                Every time you finish a workout, you will switch to the next day
                for your next session.
                <br/> 
                Example: Monday - day 1, Wednesday - day 2, Friday - day 1
                <br/>
                The next week: Monday - day 2, Wednesday - day 1, Friday - day 2
              </h4>
            </div>
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/day1" exact>
            <Day1 />
          </Route>

          <Route path="/day2" exact>
            <Day2 />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;