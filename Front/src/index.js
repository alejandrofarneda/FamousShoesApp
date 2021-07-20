import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; //Manejo de datos del usuario loggeado
import store from './store/index';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { InMemoryCache, ApolloProvider } from '@apollo/client'; //Provider para disponer de la informacion en toda la App
import ApolloClient from 'apollo-boost';
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
    // uri: 'http://localhost:9002/graphql', //Para montar el server Fake comentar línea 16 en Products (stock)
});
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ApolloProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
