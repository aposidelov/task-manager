import { SELECT_TASK, WILL_EDIT_NAME, END_EDIT } from './types';


export default {
    
    selectTask: (id) => {
        return {
            type: SELECT_TASK,
            id
        }
    },

    willEditName: (id) => {
        return {
            type: WILL_EDIT_NAME,
            payload:{
                editState: 'willEdit',
                id
            }
        }
    },

    endEdit: () => {
        return {
            type: END_EDIT,
            payload:{
               id: '',
               value: '',
               editState: ''
            }
        }
    },
};