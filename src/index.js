import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@styles/index.css";

import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import Slider from "react-slick";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

function App() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <div className="App container">
            <div className="container-main">
                <Slider {...settings}>
                    <div className="slicky-content">
                        <h3>1</h3>
                    </div >
                    <div className="slicky-content">
                        <h3>2</h3>
                    </div>
                    <div className="slicky-content">
                        <h3>3</h3>
                    </div>
                </Slider>
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