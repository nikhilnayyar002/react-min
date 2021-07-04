import "@styles/index.css";

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [state] = useState(Date.now())

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