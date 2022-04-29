import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'


const defaultState = {
    unreadEmailsCount: 73
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {


        default:
            return state
    }
}

const store = createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);