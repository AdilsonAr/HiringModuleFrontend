import React, {useState} from 'react';

const Detalle = (props) => {
    const [text, setData] = useState(props.text);

    return(
        <div className='m-2' style={{backgroundColor:props.color,display:'inline-block',paddingInline:'1%',borderRadius:'15px'}}>
            {text}
        </div>
    )
}

export default Detalle;