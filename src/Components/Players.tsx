import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Player{
    id:number,
    name:string,
    abbrev:string,
    team_id:number,
    team_name:string
}

interface Team{
    name:string
}

function Players(){

    const [players, setPlayers] = useState<Player[]>([]);
    const [teamnames,setTeamnames] = useState<string[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<string>("All");

    useEffect(() => {axios
        .get<Player[]>(`http://localhost:3000/players`)
        .then((response) => {
          console.log(response);
          setPlayers(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(()=>{
        let teams = players.map(team => team.team_name)
        let unique = Array.from(new Set(teams))
        setTeamnames(unique)
    },[players])

    const handleTeams = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeam(event.target.value)
    }

    const filteredData = selectedTeam === "All" ? players : 
    players.filter(player => player.team_name === selectedTeam);

    return <>
        <h1>Players</h1>
        <hr></hr>
        <p>Team:</p>
        
        <select onChange={handleTeams} value={selectedTeam}>
        <option value="All">All</option>

            {teamnames.map((team ,index) => (
                <option key={index} value={team}>{team}</option>
            ))}
            
        </select>
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Info *</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((player) => {
                    return (
                    <tr key={player.id}>
                        <td><img src={`/src/assets/icons/abbrev/${player.abbrev}.png`} width={25}></img></td>
                        <td>{player.name}</td>
                        <td>{player.team_name}</td>
                        <td><a href={`https://www.rugbyworldcup.com/2023/teams/${player.team_name}/player/${player.id}`}>info</a></td>
                    </tr>
                    );
                })}

            </tbody>
        </table>
    </>
}

export default Players;