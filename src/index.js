import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom';
import svg from './react.svg';
import Svg from './react.svg?react';

function App() {
    return (
        <div>
            <img src={svg} width="200" height="200" />
            <div id="css-svg-sample"></div>
            <Svg  width="200" height="200" viewBox="0 0 3500 3500"/>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);