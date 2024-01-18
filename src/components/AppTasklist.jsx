import React, { useEffect, useState } from 'react';

export default function AppTodolist() {
    const [todoList, setTodolist] =useState(initialList); //list 목록 관리
    const [todoInput, setTodoInput] =useState(''); // 입력값 관리
    const [renderList, setRenderlist] = useState([])//브라우저 렌더링 값 관리.
    const handleChange = (id) => { // all(true & false), active(false), done(true) 표시를 위한 상태 관리
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
    const handleShowTrue = () => {
        const filteredList = [
            ...todoList.filter((item) => item.checked),
          ];
          return filteredList;
    }
    const handleShowFalse = () => {
        setTodolist((prev) => 
        prev.map((item)=> (!item.checked ? {...item} : null)).filter(Boolean));
    }
    const handleShowAll = () =>{
        setTodolist([...todoList]);
    }

    const setKey = () =>{
        return new Date().getTime()+Math.random(); // key값 설정
    }
    
    const handleAdd = () =>{
        if(todoInput.trim() !== ''){
            setTodolist((prevList)=>{
                const newTodoList =[...prevList, {id:setKey(), text:todoInput, checked:false}]
                setRenderlist(newTodoList);
                return newTodoList;
            });
            setTodoInput('');
        }
        
    }
    const handleEnter = (e) =>{
        if(e.key === 'Enter'){
            handleAdd();
        }
    }

    const handleDelete = (todoListId) =>{
        const newTodoList = 
        todoList.filter(item => item.id !==todoListId)
        setTodolist(newTodoList);
        setRenderlist(newTodoList);
    }

    const handelUpdate = () =>{

    }

    return (
        <div>
            <h2>Todo List</h2>
                <button onChange={()=> handleShowAll}>all</button> 
                <button onChange={()=> handleShowTrue}>active</button>
                <button onChange={()=> handleShowFalse}>done</button>
            {/* <ul>
                {todoList.map((todoList)=>(
                    <li key={todoList.id}>
                        <input type="checkbox" checked={todoList.checked} onChange={()=>handleChange(todoList.id)}/>                        
                        {todoList.text}
                        <button onClick={()=>handleDelete(todoList.id)}>delete</button>
                    </li>
                ))}
            </ul>       */}

            <ul>
                {renderList.map((todoList)=>(
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
                    onKeyfress={handleEnter}
                />
                <button onClick={handleAdd}>add</button>    
            </div>
        </div>        
    );
}

const initialList =[];
