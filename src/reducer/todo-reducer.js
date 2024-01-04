export default function todoReducer(todoList, action){
    switch(action.type){
        case 'updated': {
            return {

            }
        }

        case  'added':{
            const { current } = action;
            if(current !== ''){
                return [...todoList, current]
            }
            else {
                return todoList;
            }
        }

        case 'deleted':{
            const { newList, listIndex } =action;
            newList.splice(listIndex, 1)
            return newList;
        }

        default :{
            throw Error(`알수없는 액션 타입이다 : ${action.type}`);
        }

    }
}