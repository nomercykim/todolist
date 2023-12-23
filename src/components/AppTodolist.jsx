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
    const handleDelete =() =>{
        //todoList에서 맵 돌리면서 index로 접근해서 필터쓰나..? 근데 key값 오류는 어케 잡누
        // key값을 생성하면서 입력받은 todo로 줘버리면?
        dispatch({type:'delteted', })
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
                    {todoList.list.map((list, index) =>(
                        <form>
                            <li key={index}>
                                <input type="checkbox"/>
                                {list.listName}
                                <button onClick={handleDelete}>삭제</button>
                            </li>
                        </form>
                    ))}
                </ul>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='todo'></label>
                    <input 
                        type='text'
                        placeholder='Add Todo'
                        id='todo'
                        name='todo'
                        value={todo}
                        onChange={(e) =>{setTodo(e.target.value)}}
                    />
                    <button
                        onClick={handleAdd}
                    >Add
                    </button>
                </form>
            </div>
        </div>        
    );
}

const initialList ={
    list:[]
}