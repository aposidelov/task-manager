import initialTodo from "../mocks/initialTodo";
//const initialTodo = [];

export function todo (state = initialTodo, action) {

  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DEL_TODO":
      return [...state.filter((item)=> item.id !== action.id)];

    case "DID_EDIT_TITLE":
      return  state.map((item) => {
                if(item.id === action.payload.id){
                  item.title = action.payload.value
                }
                return item 
              });
    case "DID_EDIT_BODY":
      return  state.map((item) => {
                if(item.id === action.payload.id){
                  item.description = action.payload.value
                }
                return item 
              });   
    default:
      return state
  }
};

const editInitial = {
  id: '',
  title: false,
  description: false
};

export function edit (state = editInitial, action) {

  switch (action.type) {
    case "WILL_EDIT_TITLE":
      return {...state,  ...action.payload};
    case "DID_EDIT_TITLE":
      return {...state, id: '', title: false};
    case "WILL_EDIT_BODY":
      return {...state,  ...action.payload};
    case "DID_EDIT_BODY":
      return {...state, id: '', description: false};               
    default:
      return state
  }
};