const defaultState ={
  data: [],
  currentSelected: [1, 1]
};
for(var i = 0; i < 10; i++){
  defaultState.data[i] = Array(10).fill('');
}
const copyState = (state) => {
  return Object.assign({}, state)
}

export default function(state=defaultState, action) {
  let newState = copyState(state);
  switch (action.type) {
    case 'UPDATE_CELLS':

      newState.data[action.row][action.column] = action.newValue;
      return newState;
    case 'UPDATE_CURRENT_SELECTED':
      console.log("what?", action.newRow, action.newColumn);
      newState.currentSelected = [action.newRow, action.newColumn];
      console.log("new state", newState.currentSelected);
      return newState;
    default:
      return state;

  }
}
