export default function todoReducer(todoList, action){
    switch(action.type){
        case 'updated': {
            
            return {

            }
        }
        case  'added':{
            const { current } = action;
            return{                
                ...todoList, list: [...todoList.list, {listName:current}]
            }
        }
        case 'deleted':{
            const {  } =action;
            return{
                
            }
        }
        default :{
            throw Error(`알수없는 액션 타입이다 : ${action.type}`);
        }

    }
}