// store.d.ts
declare module './store.js' {
    import { Store } from 'redux';
    
    const store: Store; // Define el tipo de tu store
    export default store;
}