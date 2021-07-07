import React from 'react';
import ReactDOM from 'react-dom';

export default function render(App) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

