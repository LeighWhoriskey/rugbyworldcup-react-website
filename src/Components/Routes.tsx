import axios from "axios";
import { useState } from "react";

function Routes(){

  const [data, setData] = useState(""); 

  const handleClickVenues = () => {
    axios.get("http://localhost:3000/venues").then((res) => {
      setData(JSON.stringify(res.data, null, 3));
    });
  };

  const handleClickTeams = () => {
    axios.get("http://localhost:3000/teams").then((res) => {
      setData(JSON.stringify(res.data, null, 3));
    });
  };

  const handleClickTeamsID = () => {
    axios.get("http://localhost:3000/teams/A").then((res) => {
      setData(JSON.stringify(res.data, null, 3));
    });
  };

  const handleClickPlayers = () => {
    axios.get("http://localhost:3000/players").then((res) => {
      setData(JSON.stringify(res.data, null, 3));
    });
  };

  const handleClickResults = () => {
    axios.get("http://localhost:3000/results/36").then((res) => {
      setData(JSON.stringify(res.data, null, 3));
    });
  };

  return <>
    <h1>Routes</h1>
    <hr></hr>

    <table className="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Route</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Get venues</td>
          <td>
            <a href="http://localhost:3000/venues">/venues</a>
          </td>
          <td></td>
          <td>
            <button onClick={handleClickVenues} id="venues" type="button">
              Get
            </button>
          </td>
        </tr>
        <tr>
          <td>Get teams</td>
          <td>
            <a href="http://localhost:3000/teams">/teams</a>
          </td>
          <td></td>
          <td>
            <button
              onClick={handleClickTeams}
              id="teams"
              type="button"
            >
              Get
            </button>
          </td>
        </tr>
        <tr>
          <td>Get pool teams</td>
          <td>
            <a href="http://localhost:3000/teams/A">/teams/A</a>
          </td>
          <td>
          </td>
          <td>
            <button
              onClick={handleClickTeamsID}
              id="teamsByPool"
              type="button"
            >
              Get
            </button>
          </td>
        </tr>
        <tr>
          <td>Get players</td>
          <td>
            <a href="http://localhost:3000/players">/players</a>
          </td>
          <td></td>
          <td>
            <button
              onClick={handleClickPlayers}
              id="teams"
              type="button"
            >
              Get
            </button>
          </td>
        </tr>
        <tr>
          <td>Get results</td>
          <td>
            <a href="http://localhost:3000/results/36">/results/36</a>
          </td>
          <td></td>
          <td>
            <button
              onClick={handleClickResults}
              id="teams"
              type="button"
            >
              Get
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <hr />
    <h5>JSON Response for routes</h5>

    <textarea
      id="textarea"
      className="form-control"
      rows={20}
      cols={100}
      value={data}
      readOnly
    ></textarea>
  </>
}

export default Routes;