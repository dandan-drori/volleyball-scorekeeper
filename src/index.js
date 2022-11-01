import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './pages/root';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import {setsReducer, playersReducer} from './redux/reducers';

const store = configureStore({
    reducer: {
        sets: setsReducer,
        players: playersReducer,
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
