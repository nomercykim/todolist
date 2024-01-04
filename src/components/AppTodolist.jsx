

import React, { useReducer, useState } from 'react';
import todoReducer from '../reducer/todo-reducer';

export default function AppTodolist() {
    //const [todoList, setTodolist] =useState(initialList);
    const [todoList, dispatch] = useReducer(todoReducer, initialList)

    const [todo, setTodo]=useState('');
    const handleSubmit =(e)=>{e.preventDefault();}
    
    const handleAdd = () =>{
        const current = todo;
        dispatch({type:'added', current })
        setTodo('')
    }
    const handleDelete =(index) =>{
        const newList = [...todoList]
        const listIndex = index;
        dispatch({type:'delteted', newList, listIndex})
    }
    const handelUpdate = () =>{

    }

    return (
        <div>
            <nav>
                <button>darkMode</button>
            </nav>
            <div>
                <ul>
                    {todoList.map((todoList) =>(                
                        <li key={}>
                            <input type="checkbox"/>
                            {todoList}
                            <button onClick={()=>handleDelete()}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input 
                    type='text'
                    placeholder='Add Todo'
                    id='todo'
                    name='todo'
                    value={todo}
                    onChange={(e) =>{setTodo(e.target.value)}}
                />
                <button onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>        
    );
}

const initialList = []