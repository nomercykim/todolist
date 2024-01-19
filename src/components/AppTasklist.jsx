import React, { useState } from 'react';
import { TiWeatherSunny } from "react-icons/ti";
import styles from './AppTasklist.module.css';
import { GrFormTrash } from "react-icons/gr";

export default function AppTodolist() {
    const [todoList, setTodolist] = useState(initialList); //list 목록 관리
    const [todoInput, setTodoInput] = useState(''); // 입력값 관리
    const [renderList, setRenderlist] = useState([])//브라우저 렌더링 값 관리.
    const [activeButton, setActiveButton] = useState(null);

    // checked 의 토글을 위한 함수
    const toggleItemChecked = (list, id) => {
        return list.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    } 
    // all(true & false), active(false), done(true) 표시를 위한 상태 관리
    const handleChange = (id) => { 
        setTodolist((prev) => toggleItemChecked(prev, id));
        setRenderlist((prev) => toggleItemChecked(prev, id));
    }
    //const handleSubmit =(e)=>{e.preventDefault();}
 
    // 난수로 key값 설정
    const setKey = () => {
        return new Date().getTime() + Math.random(); 
    }

    // renderlist와 todolist에 상태값(id, text, checked를 더함.
    const handleAdd = () => {
        if (todoInput.trim() !== '') {
            setTodolist((prevList) => {
                const newTodoList = [...prevList, { id: setKey(), text: todoInput, checked: false }]
                setRenderlist(newTodoList);
                return newTodoList;
            });
            setTodoInput('');
        }
    }
    // add 버튼 대신 todo 입력 후 enter를 사용할 때도 동작하게 만들기 위함.
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }

    // renderlist와 todolist의 상태값을 rendlist.map()안의 id값을 받아와서 삭제.
    const handleDelete = (todoListId) => {
        const newTodoList =
            todoList.filter(item => item.id !== todoListId)
        setTodolist(newTodoList);
        setRenderlist(newTodoList);
    }

    // handleShowTure, handleShowFalse에서 renderlist와 todolist의 상태값을 비교하기 위한 함수.
    const compareState = (state1, state2) => {
        // JSON.stringify를 사용하여 간단하게 비교
        return JSON.stringify(state1) === JSON.stringify(state2);
      };

    // activeButton을 통해 All / active / done 버튼의 색을 변경.
    const getButtonStyle = (buttonId) => {
        return activeButton === buttonId ? styles.activeButton : styles.inactiveButton;
    };
    // renderlist와 todolist의 상태값을 비교해 같지않다면 renderlist에 todolist값을 넣어준 뒤 checked가 flase인 값을 삭제.
    const handleShowTrue = (buttonId) => {
        if (!compareState(renderList, todoList)) {
            setRenderlist([...todoList]); // 상태가 다르면 todolist로 갱신
            setRenderlist((prev) => prev.filter((item) => !item.checked));
          }
          else{
            setRenderlist((prev) => prev.filter((item) => !item.checked));
            }
        setActiveButton(buttonId);
        }
    // renderlist와 todolist의 상태값을 비교해 같지않다면 renderlist에 todolist값을 넣어준 뒤 checked가 true인 값을 삭제.
    const handleShowFalse = (buttonId) => {
        if (!compareState(renderList, todoList)) {
            setRenderlist([...todoList]); // 상태가 다르면 todolist로 갱신
            setRenderlist((prev) => prev.filter((item) => item.checked));
        }
        else{
            setRenderlist((prev) => prev.filter((item) => item.checked));
        }
        setActiveButton(buttonId);
    }
    //renderlist에 todolist값을 넣어줌.
    const handleShowAll = (buttonId) => {
        setRenderlist([...todoList]);
        setActiveButton(buttonId);
    }

    // DarkMode 전환 및 버튼 이미지 변경.
    const handleDarkMode = () =>{
        //<TiWeatherNight />

    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p className={styles.buttonline}>
                    <span>
                        <button onClick={handleDarkMode}><TiWeatherSunny /></button>
                    </span>
                    <span>
                        <button className={`${styles.button} ${getButtonStyle(1)}`} onClick={() => handleShowAll(1)}>All</button>
                        <button className={`${styles.button} ${getButtonStyle(2)}`} onClick={() => handleShowTrue(2)}>Active</button>
                        <button className={`${styles.button} ${getButtonStyle(3)}`} onClick={() => handleShowFalse(3)}>Completed</button>
                    </span>
                </p>
                <ul>
                    {renderList.map((renderList) => (
                        <li key={renderList.id}>
                            <input className={styles.checkbox} type="checkbox" checked={renderList.checked} onChange={() => handleChange(renderList.id)} />
                            <div className={styles.checkboxText}>{renderList.text}</div>
                            <button className={styles['delete-button']} onClick={() => handleDelete(renderList.id)}><GrFormTrash /></button>
                        </li>
                    ))}
                </ul>
                <div className={styles.inputButton}>
                    <input
                        type='text'
                        placeholder='Add Todo'
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        onKeyPress={handleEnter}
                    />
                    <button onClick={handleAdd}>add</button>
                </div>
            </div>
        </div>
    );
}

const initialList = []; 