import React from 'react';
import { useSelector } from 'react-redux';
const ComponentC = () => {
    const data = useSelector((store)=>store.data)
    // console.log(data);
    return (
       <>
        {/* <h1>Component C</h1> */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}}>
            { data.map((el)=><h3 style={{border:'1px solid black'}} key={el}>{el}</h3>) }
        </div>
       </>
    );
};

export default ComponentC;