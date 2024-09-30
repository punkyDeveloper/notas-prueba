<<<<<<< HEAD:src/web/src/reducers.js
// reducers.js
import { CHANGE_VIEW } from './actions.js';
=======
import { CHANGE_VIEW } from './actions.ts';
>>>>>>> 5a3a5168e8c1fc596e9faff5196857218199aa54:src/web/src/reducers.ts

// Define el estado inicial (por defecto, el usuario está en la vista de login)
const initialState = {
  currentView: 'login', // Puede ser 'login' o 'register'
};

// Reducer para manejar cambios de vista
const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        currentView: action.payload,
      };
    default:
      return state;
  }
};

export default viewReducer;

