import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Board from "../board/Board";
import Register from "../register/Register";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route component={Home} exact path="/" />
              <Route component={Board} exact path="/board" />
              <Route component={Register} exact path="/register" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
