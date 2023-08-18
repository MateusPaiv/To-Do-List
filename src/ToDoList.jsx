import React from "react";  
import { useState, useEffect} from "react";
import Icone from "./assets/icon.png"

import './TodoList.css'

function TodoList(){
    const listaStorage = localStorage.getItem('lista')

    const[lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("")

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    },[lista])
    function addItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted:false}])
        setNovoItem("");
        document.getElementById('inputEntry').focus;
    }
    function click(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux); 
    }
    function deleteItem(index){
        const listaAux = [...lista]
        listaAux.splice(index,1)
        setLista(listaAux);
    }

    function deleteAll(){
        setLista([]);
    }
    return(
        <div>
            <h1>To Do List</h1>
            <form onSubmit={addItem}>
                <input id="inputEntry" type="text" value={novoItem} onChange={(e) =>{setNovoItem(e.target.value)}} placeholder="Type a task"/>
                <button type="submit" className="add">Add</button>
            </form>
            <div className="list">
                <div>
                    {
                    lista.length < 1 
                    ?  
                    <h3>List is empty</h3>
                    :
                    lista.map((item, index) => (
                        
                        <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                            <span onClick={()=>{click(index)}}>{item.text}</span>
                            <button  onClick={()=>{deleteItem(index)}} className="delete">Delete</button>
                        </div>
                    ))
                    
                    } 
                    {
                        lista.length > 0 && <button onClick={()=>{deleteAll()}} className="deleteAll">Delete all</button>
                    }
                </div>
            </div>
   
        </div>
    )
}
export default TodoList;