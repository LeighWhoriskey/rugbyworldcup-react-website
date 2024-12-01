import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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


function Results(){

    const [results, setResults] = useState<Results[]>([]);
    const [stages, setStages] = useState<string[]>([]);
    const [selectedStage, setSelectedStage] = useState<string>("All Stages");


    useEffect (() => {axios
        .get<Results[]>(`http://localhost:3000/results`)
        .then((response) => {
          console.log(response);
          setResults(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(()=>{
        let stage = results.map(results => results.stage)
        let unique = Array.from(new Set(stage))
        setStages(unique)
    },[results])

    const filteredData = selectedStage === "All Stages" ? results : 
    results.filter(stage => stage.stage === selectedStage);

    const handleStages = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedStage(event.target.value)
    }

    return <>
        <h1>Results</h1>
        <hr></hr>

        <p>Stage:</p>
            
        <select onChange={handleStages} value={selectedStage}>
        <option value="All Stages">All Stages</option>

            {stages.map((stage ,index) => (
                <option key={index} value={stage}>{stage}</option>
            ))}
            
        </select>
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
            {filteredData.map((result,index) => (
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
    </>
}

export default Results;