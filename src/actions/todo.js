export default {
    add: (data) => {
        const {title, description}= data;
        return {
                type: 'ADD_TODO',
                payload: {
                    id:  Math.floor( Math.random() * 10000000 + Math.random() * 1000 ),
                    title,
                    description,
                    created_at:  Date.now()
                }
        }
    },

    del: (id) => {
        return {
            type: 'DEL_TODO',
            id
        }
    },
    willEditTitle: (id) => {
        return {
            type: 'WILL_EDIT_TITLE',
            payload:{
               title: true,
               description: false,
               id
            }
            
        }
    },
    didEditTitle: ({id, value}) => {
        return {
            type: 'DID_EDIT_TITLE',
            payload:{
               id,
               value
            }
            
        }
    },
    willEditBody: (id) => {
        return {
            type: 'WILL_EDIT_BODY',
            payload:{
               description: true,
               title: false,
               id
            }
            
        }
    },
    didEditBody: ({id, value}) => {
        return {
            type: 'DID_EDIT_BODY',
            payload:{
               id,
               value
            }
            
        }
    },
};