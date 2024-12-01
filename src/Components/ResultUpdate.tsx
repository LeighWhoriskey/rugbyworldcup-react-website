import axios from "axios";
import { format } from "date-fns";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";


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


function ResultUpdate(){
    const [result, setResult] = useState<Results[]>([]);
    const {match_id} = useParams<{match_id:string}>();
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [warning, setWarning] = useState("");

    const team1Ref = useRef<HTMLInputElement>(null);
    const team2Ref = useRef<HTMLInputElement>(null);

    const history = useHistory();

    useEffect(() => {axios
        .get(`http://localhost:3000/resultsByMatch/${match_id}`)
        .then((res) => {
        setResult(res.data);
        setTeam1(res.data[0].team1_score.toString());
        setTeam2(res.data[0].team2_score.toString());
                
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function handleUpdate(event: FormEvent) {
        event.preventDefault();

        

        if(team1Ref.current != null && team2Ref.current !=null){
            let updatedScores = {
                match_id: match_id,
                team1_score: team1Ref.current.value,
                team2_score: team2Ref.current.value
            };

            axios.put(`http://localhost:3000/results/`, updatedScores)
            .then(res => {if(res.status === 201){
                setTeam1(updatedScores.team1_score);
                setTeam2(updatedScores.team2_score);
                setWarning("Data Updated");
            }else{
                setWarning("Data Not Updated");
            }})
            .catch((error) => {
                console.log(error);
            });
        }
  
    }

    function handleCancel() {
        history.push("/resultsAdmin");
    }

    const filtered = result[0];

    return <>
        <h1>Update Results</h1>
        <hr></hr>
        <table className="table border">
            <thead>
                <tr>
                    <th>Date & Time</th>
                    <th>Stage</th>
                    <th>Venue</th>
                </tr>
            </thead>
            <tbody>  
                {result.map((result,index) => ( 
                    <tr key={result.match_id}>
                        <td>
                            {format(result.date, "dd/MM/yyyy")}@
                            {result.time}
                        </td>
                        <td>{result.stage}</td>
                        <td>{result.venue_name}</td>
                    </tr>
                ))} 
                
            </tbody>
        </table>

        <form onSubmit={handleUpdate}>
            
            
            <div className="mb-3">
                <img
                    src={`/src/assets/icons/${filtered?.team1_id}.png`}
                    alt="description"
                    width="15px"
                />
                <label htmlFor="team1">{filtered?.team1_name}</label>
                <input
                    ref={team1Ref}
                    type="number"
                    className="form-control"
                    id="team1"
                    placeholder={team1}
                    required
                />
            </div>

            <div className="mb-3">
                <img
                    src={`/src/assets/icons/${filtered?.team2_id}.png`}
                    alt="description"
                    width="15px"
                />{" "}
                <label htmlFor="team2">{filtered?.team2_name}</label>
                <input
                    ref={team2Ref}
                    type="number"
                    className="form-control"
                    id="team2"
                    placeholder={team2}
                    required
                />
            </div>

            <button onClick={handleCancel} className="btn btn-warning me-2">
                Cancel
            </button>
            <button className="btn btn-primary me-2">Update</button>
        </form>

        <p>{warning}</p>
    </>
}


export default ResultUpdate;