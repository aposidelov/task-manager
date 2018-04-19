import mock from '../mocks/tasks';
import { 
    SELECT_TASK, 
    WILL_EDIT_NAME,
    END_EDIT,
    SEND_DATA,
    SENT_SUCCESS,
    SENT_FAILURE
} from '../actions/types';


const initialTasks = mock.map((item) => {
    const newItem = {...item};
    newItem.id = '' + item.id;
    return newItem
});

export const tasks = (state = initialTasks, action) => {

    switch (action.type) {
        case SENT_SUCCESS:
            const { id, name } = action.payload;
            return state.map((item) => {
                const newItem = {...item};
                if(item.id === id) newItem.name = name;
                return newItem 
            }); 

        default:
            return state
    } 
};

const handlingInitial = {
    id: '',
    editState: '',
    value: ''
};

export const taskHandling = (state = handlingInitial, action) => {

    switch (action.type) {
        case SELECT_TASK:
            return { ...state, id: action.id };
        case WILL_EDIT_NAME:
            return { ...state, ...action.payload };
        case SEND_DATA:
            return { ...state, editState: 'sending' };
        case SENT_SUCCESS:
            const { id, name: value } = action.payload;
            return { ...state, editState: 'success', id, value }; 
        case END_EDIT:
            return { ...state, ...action.payload };
                    
        default: return state
    }
};

const sendTaskInitial = {
    isFetching: false,
    isReceivedOk: true,
    status: {
        value: '',
        statusText: ''
    }
};

export const sendTask = (state = sendTaskInitial, action) => {

    switch (action.type) {
        case SEND_DATA:
            return { ...state, ...action.payload };
        case SENT_SUCCESS:
            return { ...state, ...action.payload };
        case SENT_FAILURE:
            return { ...state, ...action.payload }; 

        default: return state
    }
};
