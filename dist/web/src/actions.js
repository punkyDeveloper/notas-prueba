// Define las acciones para cambiar de vista
export const CHANGE_VIEW = 'CHANGE_VIEW';
// Acción para cambiar la vista
export const changeView = (view) => ({
    type: CHANGE_VIEW,
    payload: view,
});
