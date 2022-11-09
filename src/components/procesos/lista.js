import React, {useState} from 'react';

const Lista = (props) => {
    const [data, setData] = useState(props.data);
    const getLista=(data)=>{
        console.log(JSON.stringify(data));
        data.map((x)=>{
            return(
                <tr id={x.idProceso}>
                    <td>
                        <h6>{x.titulo}</h6>
                        <p>{x.funciones}</p>
                        <p>{x.requerimientos}</p>
                    </td>
                </tr>
            )
        })
    }

    return(
        <table>
            {getLista(data)}
        </table>
    )
}

export default Lista;