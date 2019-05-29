import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom'
import React from 'react'
import App from './App';
import "bootstrap/dist/css/bootstrap.css"

const Root = ({ store }) =>(
    <Provider store = {store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);


export default Root;
