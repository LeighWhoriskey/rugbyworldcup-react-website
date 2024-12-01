import axios from "axios";
import { useEffect, useState } from "react";

interface Venue {
    id: number;
    name: string;

}
function Venues() {

    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {axios
        .get<Venue[]>("http://localhost:3000/venues")
        .then((response) => {
          console.log(response);
          setVenues(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <>
        <h1>Venues</h1>
        <hr></hr>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Venue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {venues.map((venue, index) => {
                        return (
                        <tr key={venue.id}>
                            <td>{index + 1}</td>
                            <td>{venue.name}</td>
                        </tr>
                        );
                    })}

                </tbody>
            </table>
        </>
    );
}

export default Venues;