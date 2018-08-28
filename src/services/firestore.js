import firebase from './firebase'

const db = firebase.firestore()

export const columnsRef = db.collection('columns')
export const todosRef = db.collection('todos')


// export const removeItem = (columnId, itemId ) => {
//     todosRef.doc(itemId).delete()
//     .then(()=>{
//         return columnsRef.doc(columnId).get()
//     })
//     .then(doc=>{
//         const column = doc.data()
//         column.order.splice(itemId,1)
//         return columnsRef.doc(columnId).set(column)     
//     })
// }

// export const getColumns = () => {
//     const columns = {}
//     return columnsRef.get()
//     .then(snap=>{
//         snap.forEach(doc=>{
//             const column = doc.data()
//             if(column.todoRefs){
//                 column.todoRefs.forEach(todoRef=>{
//                     todoRef.get().then(doc=>{
//                         if(!column.todos) column.todos = {}
//                         column.todos[doc.id] = doc.data()
//                     })   
//                 })
//             }
//             columns[doc.id] = column
//         })
//         console.log(columns)
//         return columns
//     })
// }