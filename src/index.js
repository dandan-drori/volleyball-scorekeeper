import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './pages/root';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import { setsReducer, playersReducer, rotationReducer } from './redux/reducers';
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const client = new ApolloClient({
    uri: 'https://volley-score.onrender.com/graphql',
    cache: new InMemoryCache(),
});

const store = configureStore({
    reducer: {
        sets: setsReducer,
        players: playersReducer,
        rotation: rotationReducer,
    }
});

const dndBackend = !!("ontouchstart" in window || navigator.maxTouchPoints) ? TouchBackend : HTML5Backend;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <DndProvider backend={dndBackend}>
                    <App />
                </DndProvider>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
