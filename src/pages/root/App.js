import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Board from "../board";
import Register from "../register";
import TeamStats from "../team-stats";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route component={Board} path="/board" />
              <Route component={Register} path="/register" />
              <Route component={TeamStats} path="/stats/:team" />
              <Route component={Home} path="/" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
