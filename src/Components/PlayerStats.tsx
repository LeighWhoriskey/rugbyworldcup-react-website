import axios from "axios";
import { ChangeEvent, Children, useEffect, useState } from "react";


interface PlayerData{
    points:Players[],
    tackles:Players[]
}

interface Players{
    player_id:number,
    team_id:number,
    player_name:string,
    team_name:string,
    points:number,
    tackles:number
}

function PlayerStats(){

    const [playersPoints, setPlayersPoints] = useState<Players[]>([]);
    const [playersTackles, setPlayersTackles] = useState<Players[]>([]);
    const [points, setPoints] = useState<string>("Points")

    useEffect (() => {axios
        .get(`http://localhost:3000/playerStats`)
        .then((response) => {
          console.log(response);
          setPlayersPoints(response.data[0]);
          setPlayersTackles(response.data[1]);
        })
        .catch((error) => console.log(error));
    }, []);

    const pointsTableData = playersPoints.map((player,index) => (
        <tr key={index +1}>
            <td>{index + 1}</td>
            <td></td>
            <td><a href={`https://www.rugbyworldcup.com/2023/teams/${player.team_name}/player/${player.player_id}`}>{player.player_name}</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td><img src={`/src/assets/icons/${player.team_id}.png`} width={25}></img>{player.team_name}</td>
            <td></td>
            <td></td>
            <td>{player.points}</td>
        </tr>))

    const tacklesTableData = playersTackles.map((player,index) => (
        <tr key={index +1}>
            <td>{index + 1}</td>
            <td></td>
            <td><a href={`https://www.rugbyworldcup.com/2023/teams/${player.team_name}/player/${player.player_id}`}>{player.player_name}</a></td>
            <td></td>
            <td></td>
            <td></td>
            <td><img src={`/src/assets/icons/${player.team_id}.png`} width={25}></img>{player.team_name}</td>
            <td></td>
            <td></td>
            <td>{player.tackles}</td>
        </tr>))

    const getStats = () =>{
        return points  === "Points" ? pointsTableData : tacklesTableData
    }

    const handlePlayers = (event: ChangeEvent<HTMLSelectElement>) => {
        setPoints(event.target.value)
    }

    return <>
        <h1>Player Stats</h1>
        <hr></hr>

        <p>Stat:</p>
            
        <select  onChange={handlePlayers} value={points}>
        <option value="Points">Points</option>
        <option value="Tackles">Tackles</option>
        </select>

        <table className="table">
        <thead>
            <tr>
            <th>#</th>
            <th></th>
            <th>Player</th>
            <th></th>
            <th></th>
            <th></th>
            <th>Team</th>
            <th></th>
            <th></th>
            <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {getStats()} 
        </tbody>
        </table>
    </>
}

export default PlayerStats;