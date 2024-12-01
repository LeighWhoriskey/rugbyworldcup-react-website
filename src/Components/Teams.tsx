import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Team {
  id: number;
  name: string;
  pool: string;
}

function Teams(){

    const [teams , setTeams] = useState<Team[]>([]);

    useEffect(() => {axios
        .get<Team[]>("http://localhost:3000/teams")
        .then((response) => {
          console.log(response);
          setTeams(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return <>
        <h1>Teams</h1>
        <hr></hr>
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Team</th>
                    <th>Pool</th>
                </tr>
                </thead>
                <tbody>
                {teams.map((team) => {
                    return (
                    <tr key={team.id}>
                        <td><img src={`/src/assets/icons/${team.id}.png`} width={25}></img></td>
                        <td>{team.name}</td>
                        <td>
                            <Link to={`/pools/${team.pool}`}>{team.pool}</Link>
                        </td>
                    </tr>
                    );
                })}

            </tbody>
        </table>
    </>
}

export default Teams;