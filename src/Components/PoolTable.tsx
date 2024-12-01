import axios from "axios";
import { useEffect, useState } from "react";

interface Pools{
    pool:string,
    postion:number,
    team_name:string,
    played:number,
    w:number,
    d:number,
    l:number,
    pf:number,
    pa:number,
    pd:number,
    tf:number,
    ta:number,
    bonus:number,
    pts:number,
    id:number
}

function PoolTable({pool}:{pool:string}){

    const [pools, setPools] = useState<Pools[]>([])

    useEffect (() => {axios
        .get<Pools[]>(`http://localhost:3000/pool/${pool}`)
        .then((response) => {
          console.log(response);
          setPools(response.data);
        })
        .catch((error) => console.log(error));
    }, [pool]);

    const style = (number: number) =>{
        return number <=1 ?"table-secondary": ""
    }

    return <>
        <table className="table border">
            <thead>
                <tr>
                    <th><img src={`/src/assets/icons/pool${pool}.png`} width={75}></img></th>
                </tr>
                <tr>
                <th>Team</th>
                <th></th>
                <th>Pd</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>PF</th>
                <th></th>
                <th>PA</th>
                <th></th>
                <th>Bonus</th>
                <th></th>
                <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                {pools.map((pool,index) => (
                    <tr className={style(index)} key={index}>
                        <td><img src={`/src/assets/icons/${pool.id}.png`} width={25}></img> {pool.team_name}</td>
                        <td></td>
                        <td>{pool.played}</td>
                        <td>{pool.w}</td>
                        <td>{pool.d}</td>
                        <td>{pool.l}</td>
                        <td>{pool.pf}</td>
                        <td></td>
                        <td>{pool.pa}</td>
                        <td></td>
                        <td>{pool.bonus}</td>
                        <td></td>
                        <td>{pool.pts}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default PoolTable;