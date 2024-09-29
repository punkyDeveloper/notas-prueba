import { createStore } from 'redux';
import viewReducer from './reducers';

// Crea el store de Redux
const store = createStore(viewReducer);

export default store;