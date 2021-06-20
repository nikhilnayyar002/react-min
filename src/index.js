import 'antd/dist/antd.css';
import "@styles/index.css";

import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

function App() {
    return (
        <div className="App container">
            <div className="container-main"></div>
            <div className="container-footer">
                <Input.TextArea
                    placeholder="type"
                    className="inputField"
                    rows="1"
                />
            </div>
        </div>
    )
}