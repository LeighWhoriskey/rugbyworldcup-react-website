import PoolTable from "./PoolTable";


function Pools(){

    return <>
        <h1>Pools</h1>
        <hr></hr>
        <PoolTable pool={"a"}/>
        <PoolTable pool={"b"}/>
        <PoolTable pool={"c"}/>
        <PoolTable pool={"d"}/>
    </>
}

export default Pools;