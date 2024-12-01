import React from "react";
import { Link } from "react-router-dom";
interface Props{
    loggedin:boolean,
    login: () => void;
}

function Nav({loggedin, login}: Props){
 return <>
    <nav className="nav">
        <img src="/src/assets/icons/logo2.png" width="80px"></img>
        <Link to="/routes">Routes</Link> |&nbsp;
        <Link to="/venues">Venues</Link> |&nbsp;
        <Link to="/teams">Teams</Link> |&nbsp;
        <Link to="/players">Players</Link> |&nbsp;
        <Link to="/results">Results</Link> |&nbsp;
        <Link to="/resultsdate">Results By Date</Link> |&nbsp;
        <Link to="/pools">Pools</Link> |&nbsp;
        <Link to="/playerstats">Player Stats</Link> |&nbsp;
        {loggedin === true?(<>
            <Link to="/resultsAdmin">Results Admin</Link> |&nbsp;
            <Link to="/logout">Logout</Link> |&nbsp;
            {localStorage.getItem("email")} 
        </>): <Link to="/login">Login</Link>}
         
    </nav>
    <hr/>
    <br/>
 </>
}

export default Nav;