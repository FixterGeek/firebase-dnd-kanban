import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BoxForm} from './BoxForm'
import {BoxComponent} from './BoxComponent'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import {Column} from './Column'
import {getColumns, columnsRef, todosRef} from './services/firestore'
import firebase from './services/firebase'
import { updateColumns } from './services/realtime';

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
    columnsRef.get()
    .then(snap=>{
      snap.forEach(doc=>{
        const column = doc.data()
        if(column.order){
          this.getTodos(column)
        }
        columns[doc.id] = column
        this.setState({columns})
      })
     
      //console.log(columns)

    })



    // getColumns()
    // .then(columns=>{
    //   this.setState({columns})
    // })

    // const {columns} = this.state
    // firebase.database().ref('meetup').child('columns')
    //   .on('child_added', snap=>{
    //     const key = snap.key
    //     columns[key] = snap.val()
    //     this.setState({columns})
    //   })

    //   firebase.database().ref('meetup').child('columns')
    //   .on('child_changed', snap=>{
    //     const key = snap.key
    //     columns[key] = snap.val()
    //     this.setState({columns})
    //   })


  }

  getTodos = (column) => {
    const {columns} = this.state
    column.todos = {}
    column.order.forEach(todoId=>{
      todosRef.doc(todoId).get()
      .then(doc=>{
        //console.log(doc.data())
        column.todos[doc.id] = doc.data()
        columns[column._id] = column
        this.setState({columns})
      })
    })
    
  }

  saveChanges = (columns) => {
    for(let k in columns){
      //delete columns[k].todos
      //console.log(columnas[k])
      columnsRef.doc(k).set(columns[k])
    }
  }

  removeItem = (columnId, itemId) => {
    const {columns} = this.state
    delete columns[columnId].todos[itemId]
    columns[columnId].order.splice(itemId,1)
    this.setState({columns})
    this.saveChanges(columns)
  }

  addItem = (title, columnId ) => {
    const {columns} = this.state
    const todo = {
      _id: firebase.firestore().collection('todos').doc().id,
      title,
      column:columnId
    }
    //saving
    todosRef.doc(todo._id).set(todo)
    //
    columns[columnId].todos[todo._id] = todo
    columns[columnId].order.splice(0,0,todo._id)
    this.setState({columns})
    this.saveChanges(columns)
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
    //updateColumns(columns)
    this.saveChanges(columns)
  }

  render() {
    const {columns} = this.state
    const columnsOrder = Object.keys(columns)
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      <section style={{padding:50}} className="hero is-fullheight is-primary is-bold">
                
        
        <article className="hero-head columns">
          {columnsOrder.map((id,index)=>{
            //console.log(columns[id])
            return <Column addItem={this.addItem} removeItem={this.removeItem} key={index} {...columns[id]} column={columns[id]} /> 
          })}
          </article>
        
      

      </section> 
      </DragDropContext>
    );
  }
}

export default App;
