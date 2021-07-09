import { applyMiddleware, combineReducers, createStore } from 'redux';

const defaultUserState = { info: null, token: null };

const userReducer = (state = defaultUserState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return defaultUserState;
        case 'INFO':
            return { ...state, info: action.info };
        default:
            return state;
    }
};

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_ERROR':
            return action.error;
        case 'CLEAR_ERROR':
            return null;
        default:
            return state;
    }
};

const localStorageMiddleware = (store) => (next) => (action) => {
    let result = next(action);
    localStorage.setItem('session', JSON.stringify(store.getState()));
    return result;
};

const store = createStore(
    combineReducers({
        user: userReducer,
        error: errorReducer,
    }),
    JSON.parse(localStorage.getItem('session')) || {},
    applyMiddleware(localStorageMiddleware)
);

export default store;
