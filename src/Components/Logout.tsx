import { useHistory } from "react-router-dom";

interface Props{
    login: () => void;
}

function Logout({login}: Props){
    const history = useHistory();

    return <>
    {login()}
    {history.push("/")} 
    </>
}

export default Logout;