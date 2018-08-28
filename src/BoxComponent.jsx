import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

export const BoxComponent = ({removeItem, index, _id, title="Comer pandita"}) => {
    return (
<Draggable index={index} draggableId={_id}>
{provided=>
     <div 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
     className="box" >
        <div style={{position:'relative'}}>
            <p>{title}</p>
            <span className="tache" onClick={()=>removeItem(_id)} style={styles.tache} >X</span>
        </div>
      </div>}
    </Draggable>
    )
}

const styles = {
    tache:{
        textAlign:'center',
        borderRadius:'50%',
        width:'30px',
        height: '30px',
        padding:3,
        color:'white', 
        background:'red',
        position:"absolute", 
        top:'0',
        right:'0', 
        cursor:'pointer'}
}