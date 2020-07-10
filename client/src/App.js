import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LearnMore from "./pages/LearnMore/LearnMore";
import TripBuilder from "./pages/TripBuilder/TripBuilder";
import Review from "./pages/Reviews/Reviews";
import Events from "./pages/Events/Events";
import Creation from "./pages/Creation/Creation";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import TripSubmission from "./pages/Creation/TripSubmission/tripSubmission";
import TripCompletion from "./pages/Creation/TripSubmission/TripCompletion/tripCompletion";

import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/learnmore" component={LearnMore} />
            <Route exact path="/tripbuilder" component={TripBuilder} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/creation" component={Creation} />
            <Route exact path="/main" component={Main} />
            <Route
              exact
              path="/creation/tripSubmission"
              component={TripSubmission}
            />
            <Route
              exact
              path="/creation/tripSubmission/tripCompletion"
              component={TripCompletion}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
