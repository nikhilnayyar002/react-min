import "@styles/index.css";

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const unixEpochInMs = Date.now()

function App() {
    const [state] = useState(unixEpochInMs)

    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);