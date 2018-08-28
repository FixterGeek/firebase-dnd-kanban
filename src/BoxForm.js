import React from 'react'
//import {addItem} from './services/realtime'

let text;

export const BoxForm=({addItem, columnId, open, closeForm})=>{
    if(!open) return null
    return <div>
        <textarea ref={textarea=>text=textarea} className="textarea" placeholder="Debo pasear a mi perra"></textarea>
            <button onClick={()=>{
                addItem(text.value, columnId)
                closeForm()
                }} className="button is-info">Guardar</button>
            <button onClick={closeForm} className="button is-danger">Cancelar</button>
        
    </div>
}