import "@styles/index.css";

import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return "Hello World"
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);