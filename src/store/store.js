import {createStore, combineReducers} from 'redux';

import authReducer from '../reducer/authReducer';
import chatReducer from '../reducer/chatReducer';

export default () => {
    const store = createStore(combineReducers({
        auth:authReducer,
        chats:chatReducer
    }), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store;
}