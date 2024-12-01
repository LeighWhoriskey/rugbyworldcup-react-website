import axios from "axios";
import { useEffect, useState } from "react";
import { addDays, format, getDay, subDays } from "date-fns";
import { Link } from "react-router-dom";

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


function ResultsByDate(){

    const [results, setResults] = useState<Results[]>([]);
    const [date, setDate] =useState<Date>(
        new Date("2023-09-08")
    );

    useEffect (() => {axios
        .get<Results[]>(`http://localhost:3000/resultsByDate/${format(date, "yyyy-MM-dd")}`)
        .then((response) => {
          console.log(response);
          setResults(response.data);
        })
        .catch((error) => console.log(error));
    }, [date]);

    const convertDay = (day: number) =>{
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[day]
    }

    const handlePrev = () =>{
        setDate(subDays(date, 1))
    }

    const handleNext = () =>{
        setDate(addDays(date,1))
    }

    const data = () =>{
        return results.length === 0? <td>No Data </td>:  results.map((result,index) => ( 
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
        ))
    }

    return <>
        <h1>Results by Date</h1>
        <button onClick={handlePrev}>{"<<"}</button>
        <button onClick={handleNext}>{">>"}</button>
        <p>{convertDay(getDay(date)) + " " +format(date, "dd/MM/yyyy")}</p>
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
            {data()}
        </tbody>
        </table>
    </>
}

export default ResultsByDate;