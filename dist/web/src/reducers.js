import { CHANGE_VIEW } from './actions.ts';
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
