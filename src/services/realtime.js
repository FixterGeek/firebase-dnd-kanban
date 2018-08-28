import firebase from './firebase'

const columnsRef = firebase.database().ref('meetup/columns')

export const updateColumns = (columns) => {
    columnsRef.set(columns)
}

export const addItem = (text, columnId) => {    
    //1.- una key
    let key = columnsRef.push().key
    let item = {
        _id:key,
        title:text
    }
    columnsRef.child(columnId).child('todos').child(key).set(item)
    columnsRef.child(columnId).child('order').once('value')
    .then(snap=>{
        let array;
        if(!snap.val()) array = []
        else array = snap.val()
        array.unshift(key)
        columnsRef.child(columnId).child('order').set(array)
    })
    


    //2.- a donde lo ponemos? (que columna)
    //3.- subir afirebase
}

export const removeItem = (columnId, itemId) => {
    columnsRef.child(columnId).child('todos').child(itemId).set(null)
    columnsRef.child(columnId).child('order').once('value')
        .then(snap=>{
            let array = snap.val()
            array.splice(array.indexOf(itemId), 1)
            columnsRef.child(columnId).child('order').set(array)
        })
}

