import React, { useState } from 'react';

export default function AppTodolist() {
    const [todoList, setTodolist] =useState(initialList); //list 목록 관리
    const [todoInput, setTodoInput] =useState(''); // 입력값 관리
    const handleChange = (id) => { // all(false, true), active(false), done(true) 표시를 위한 상태 관리
        setTodolist((prev) =>{
            return prev.map(item => {
                if(item.id === id){
                    return {...item, checked: !item.checked}; // active/done 설정을 위해 반대값을 줌.
                }
                return item;
            });
        });
    }
    //const handleSubmit =(e)=>{e.preventDefault();}
    const setKey = () =>{
        return new Date().getTime()+Math.random(); // key값 설정
    }
    
    const handleAdd = () =>{
        if(todoInput !== ''){
            setTodolist([...todoList, {id:setKey(), text:todoInput, checked:false} ])
            setTodoInput('');
        }
    }

    const handleDelete = (todoListId) =>{
        const newTodoList = 
        todoList.filter(item => item.id !==todoListId)
        setTodolist(newTodoList);
    }

    const handelUpdate = () =>{

    }



    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                <button>all</button> 
                <button>active</button>
                <button>done</button>

                {todoList.map((todoList)=>(
                    <li key={todoList.id}>
                        <input type="checkbox" checked={todoList.checked} onChange={()=>handleChange(todoList.id)}/>                        
                        {todoList.text}
                        <button onClick={()=>handleDelete(todoList.id)}>delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input 
                    type='text'
                    placeholder='Add Todo'
                    value={todoInput}
                    
                    onChange={(e) => setTodoInput(e.target.value)}
                />
                <button onClick={handleAdd}>add</button>    
            </div>

        </div>        
    );
}

const initialList =[];
