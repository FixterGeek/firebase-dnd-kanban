import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import {BoxForm} from './BoxForm'
import {BoxComponent} from './BoxComponent'
// import {removeItem} from './services/realtime'


export class Column extends React.Component {

    state = {
        open:false
    }

    openForm = () => {
        this.setState({open:true})
    }

    closeForm = () => {
        this.setState({open:false})
    }
    removeItem = (itemId) => {
        // removeItem(this.props._id, itemId)
    }




    render(){
        const { open } = this.state
        const {title, _id, todos={}, order=[]} = this.props
    return (
        <div className="column">

        <div style={{padding:10}} className="card"> 
        <div className="card-header"> 
          <h2 className="card-header-title">{title}</h2>
          <span onClick={this.openForm} style={{fontSize:30}} className="card-header-icon">+</span>
        </div>
        <BoxForm columnId={_id} closeForm={this.closeForm} open={open}/>
        <Droppable 
          droppableId={_id}
          index={"uno"}

          // type="material"
          >
          {(provided, snapshot)=>
        
          <div 
          {...provided.droppableProps}
            ref={provided.innerRef}

          className="card-content">
            
            {order.map((id,index)=><BoxComponent removeItem={this.removeItem} key={index} index={index} {...todos[id]} />)}
            {provided.placeholder}
          </div>}
        </Droppable>
          </div> 
        </div>  
    )
}
}