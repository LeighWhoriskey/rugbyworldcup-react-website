import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Routes from './Components/Routes';
import PageNotFound from './Components/PageNotFound';
import Venues from './Components/Venues';
import Teams from './Components/Teams';
import Teampool from './Components/Teampool';
import Players from './Components/Players';
import Results from './Components/Results';
import ResultsByTeam from './Components/ReultsByTeam';
import ResultsByDate from './Components/ResultsByDate';
import Pools from './Components/Pools';
import PlayerStats from './Components/PlayerStats';
import Login from './Components/Login';
import Logout from './Components/Logout';
import ResultsAdmin from './Components/ResultsAdmin';
import ResultUpdate from './Components/ResultUpdate';

function App() {

  const [loggedin , setLogin] = useState(false)

  const LoginCheck = useCallback(() =>{
    console.log(loggedin)
    if(loggedin === true){
      setLogin(false)
    }else{
      setLogin(true);
    }
  },[loggedin]);

  return (
    <div className="App">
    <BrowserRouter>
    <div className="App">
      <Nav loggedin={loggedin} login={LoginCheck} />
      <Switch>
        <Route path="/" exact component={Routes} />
        <Route path="/routes" component={Routes} />
        <Route path="/venues" component={Venues} />
        <Route path="/teams" component={Teams} />
        <Route path="/players" component={Players} />
        <Route path="/results" component={Results} />
        <Route path="/resultsByTeam/:teamId/:teamName" component={ResultsByTeam} />
        <Route path="/resultsdate" component={ResultsByDate} />
        <Route path="/pools/:pool" component={Teampool} />
        <Route path="/pools" component={Pools} />
        <Route path="/playerstats" component={PlayerStats} />
        <Route path="/resultsAdmin" component={ResultsAdmin} />
        <Route path="/resultUpdate/:match_id" component={ResultUpdate} />
        <Route path="/login" render={() => <Login login={LoginCheck}/>} />
        <Route path="/logout" render={() => <Logout login={LoginCheck}/>} />
        <Route path="*" component={PageNotFound} />
      </Switch>        
    </div>
    </BrowserRouter>
    </div>
  )
}

export default App
