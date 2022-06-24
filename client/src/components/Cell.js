import React from 'react';
import './Cell.css'

const Cell = ({details, updateFlag, revealCell}) => {
    return (
        <div onContextMenu={(e) => updateFlag(e,details.x,details.y)} 
             onClick={()=> revealCell(details.x,details.y)}
             className="block-style">
             {details.revealed ? details.value: ""}
            {/* {details.value!==0 && details.value} */}
        </div>
    )
}

export default Cell;