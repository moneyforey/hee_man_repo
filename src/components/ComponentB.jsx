import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDataApi } from '../redux/actions';

const initValue = '';

const ComponentB = () => {
    const dispatch = useDispatch();
    const [value,setValue] = useState(initValue);

    const handleClick =()=>{
           dispatch(postDataApi(value));
           setValue(initValue);
    }

    const handleChange =(e)=>{
        setValue(e.target.value)
    }

    return (
        <div >
            {/* <h1>Component B</h1> */}
           <input style={{padding:'1rem',margin:'1rem',width:'60%'}} value={value} onChange={handleChange} placeholder='Enter value here.....' type='text'/> 
           <br />
           <button style={{padding:'1rem',backgroundColor:'black',color:'white',borderRadius:"1rem"}} onClick={handleClick}>STORE VALUE</button>
        </div>
    );
};

export default ComponentB;