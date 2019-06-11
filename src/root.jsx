import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom'
import React from 'react'
import App from './App';
import AppContainer from './AppContainer'
import "bootstrap/dist/css/bootstrap.css";

const Root = ({ store }) =>(
    <Provider store = {store}>
        <HashRouter>
            <AppContainer />
        </HashRouter>
    </Provider>
);


export default Root;
