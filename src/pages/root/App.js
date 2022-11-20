import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Board from "../board";
import Register from "../register";
import TeamStats from "../team-stats";
import Rotation from "../rotation";
import SelectLeagueAndTeams from "../select-leagues-and-teams/SelectLeagueAndTeams";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact component={Board} path="/board" />
              <Route exact component={Register} path="/register" />
              <Route exact component={Rotation} path="/rotation" />
              <Route exact component={SelectLeagueAndTeams} path="/select-teams" />
              <Route exact component={TeamStats} path="/stats/:team" />
              <Route exact component={Home} path="/" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
