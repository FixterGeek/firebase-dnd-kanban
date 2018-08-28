import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BoxForm} from './BoxForm'
import {BoxComponent} from './BoxComponent'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import {Column} from './Column'
import {updateColumns} from './services/realtime'
import firebase from './services/firebase'

class App extends Component {

  state = {
    uno:false,
    dos:false,
    tres:false,
    columns:{
      // columnaUno:{
      //   _id:"columnaUno",
      //   title:"ToDo",
      //   todos:{
      //     "uno":{
      //       _id:"uno",
      //       title:"Mijo"
      //     },
      //     "dos":{
      //       _id:"dos",
      //       title:"Morro"
      //     }
      //   },
      //   order:["dos","uno"]
      // },
      // columnaDos:{
      //   _id:"columnaDos",
      //   title:"Doing",
      //   todos:{
      //     "tres":{
      //       _id:"tres",
      //       title:"Mijo"
      //     },
      //     "cuatro":{
      //       _id:"cuatro",
      //       title:"Morro"
      //     }
      //   },
      //   order:["cuatro","tres"]
      // },
      // columnaTres:{
      //   _id:"columnaTres",
      //   title:"Done",
      //   todos:{},
      //   order:[]
      // }

    }
  }

  componentDidMount(){

    const {columns} = this.state
    firebase.database().ref('meetup').child('columns')
      .on('child_added', snap=>{
        const key = snap.key
        columns[key] = snap.val()
        this.setState({columns})
      })

      firebase.database().ref('meetup').child('columns')
      .on('child_changed', snap=>{
        const key = snap.key
        columns[key] = snap.val()
        this.setState({columns})
      })


  }



  onDragEnd = (result) => {
    //si se suelta mal
    if(!result.destination) return
    // 0. ids
    const sourceId = result.source.droppableId
    const destinationId = result.destination.droppableId
    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    const {columns} = this.state
    const itemId = result.draggableId
    const item = columns[sourceId].todos[itemId]

    // 1.- quitar
    delete columns[sourceId].todos[itemId]
    columns[sourceId].order.splice(sourceIndex,1)
    // 2.- poner
    if(!columns[destinationId].todos) columns[destinationId].todos = {}
    columns[destinationId].todos[itemId] = item
    if(!columns[destinationId].order) columns[destinationId].order = []
    columns[destinationId].order.splice(destinationIndex,0,itemId)
    // 3.- setState
    this.setState({columns})
    updateColumns(columns)
  }

  render() {
    const {uno, dos, tres, columns} = this.state
    const columnsOrder = Object.keys(columns) 
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      <section style={{padding:50}} className="hero is-fullheight is-primary is-bold">
                
        
        <article className="hero-head columns">
          {columnsOrder.map((id,index)=><Column key={index} {...columns[id]} />)}
          </article>
        
      

      </section> 
      </DragDropContext>
    );
  }
}

export default App;
