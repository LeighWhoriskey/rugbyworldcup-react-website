import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns"; 

interface Results{
    match_id:number,
    date:string,
    time:string,
    stage:string,
    status:string,
    team1_id:number,
    team1_name:string,
    team1_score:string,
    team2_id:number,
    team2_name:string,
    team2_score:string,
    venue_id:number,
    venue_name:string
}


function ResultsByTeam(){


    const [results, setResults] = useState<Results[]>([]);
    const { teamId } = useParams<{teamId: string}>();
    const { teamName } = useParams<{teamName: string}>();

    useEffect (() => {axios
        .get<Results[]>(`http://localhost:3000/results/${teamId}`)
        .then((response) => {
          console.log(response);
          setResults(response.data);
        })
        .catch((error) => console.log(error));
    }, [teamId]);
    
    return <>
    <h1><img src={`/src/assets/icons/${teamId}.png`} width={35}></img>{teamName} Results</h1>
        <hr></hr>
        <table className="table">
        <thead>
            <tr>
            <th>Date</th>
            <th>Stage</th>
            <th></th>
            <th>Team</th>
            <th></th>
            <th>Team</th>
            <th></th>
            <th>Venue</th>
            </tr>
        </thead>
        <tbody>
            {results.map((result,index) => (
                <tr key={index}>
                    <td>{format(result.date, "dd/MM/yyyy")  + " " + result.time}</td>
                    <td>{result.stage}</td>
                    <td><img src={`/src/assets/icons/${result.team1_id}.png`} width={25}></img></td>
                    <td> <Link to={`/resultsByTeam/${result.team1_id}/${result.team1_name}`}>{result.team1_name}</Link></td>
                    <td>{result.team1_score +"-" + result.team2_score}</td>
                    <td><Link to={`/resultsByTeam/${result.team2_id}/${result.team2_name}`}>{result.team2_name}</Link></td>
                    <td><img src={`/src/assets/icons/${result.team2_id}.png`} width={25}></img></td>
                    <td>{result.venue_name}</td>
                </tr>
            ))}

        </tbody>
        </table>
        <Link to="/results"> {`<< Back to Results`}</Link>
    </>
}

export default ResultsByTeam;