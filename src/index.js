import "@styles/index.css";

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import svg from '@assets/react.svg';
import Svg from '@assets/react.svg?react';

const unixEpochInMs = Date.now()

function App() {
    const [state] = useState(unixEpochInMs)

    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
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