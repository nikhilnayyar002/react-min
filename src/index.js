import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick"
import "@styles/index.css";

import $ from 'jquery'; 
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';

function App() {
    useEffect(() => {
        $(document).ready(function () {
            $('.your-class').slick({
                arrows:false
            });
        });
    }, []);

    return (
        <div className="App container">
            <div className="container-main">
                <div className="your-class">
                    <div className="slicky-content">
                        <h3>1</h3>
                    </div >
                    <div className="slicky-content">
                        <h3>2</h3>
                    </div>
                    <div className="slicky-content">
                        <h3>3</h3>
                    </div>
                </div>
            </div>
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

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);