import React from 'react';
import {Redirect} from 'react-router-dom';

const LinkProps = (props)=>{
  return(
    <>
    {
        (props.estado === false)
        ?
        ''
        :
        <Redirect to={{
            pathname: props.url,
            state: { allProps : props }
        }}
/>

    }
    </>
)
}
export default LinkProps
