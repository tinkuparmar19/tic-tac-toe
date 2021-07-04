import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Menu from './components/Menu';
import Match from './components/Match';
import Join from './components/Join';
import ReadyToPlay from './components/ReadyToPlay';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/menu'>
            <Menu />
          </Route>
          <Route path='/match'>
            <Match />
          </Route>
          <Route path='/join'>
            <Join />
          </Route>
          <Route path='/ready'>
            <ReadyToPlay />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
