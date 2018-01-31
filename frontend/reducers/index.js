import dataReducer from './dataReducer';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
function rootReducer(state = {name: 'Horizons'}, action) {
    switch (action.type) {
        default:
            return state;
    }
}
const mainReducer = combineReducers({routing: routerReducer, rootReducer, dataReducer});
export default mainReducer;
