import React from 'react';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

const ComponentA = () => {
    return (
        <>
        {/* <h1>Component A</h1> */}
          <ComponentB/>
          <ComponentC/>
        </>
    );
};

export default ComponentA;