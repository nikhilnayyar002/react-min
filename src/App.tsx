import React, { useState } from 'react';
import { unixEpochInMs } from './common';
import sampleImg from './assets/sample.jpeg';
import sampleJson from './assets/sample.json';
import svg from '@assets/react.svg';
import Svg from '@assets/react.svg?react';

console.log(sampleJson.hello)

export default function App(): JSX.Element {
    const [state] = useState(unixEpochInMs)
    console.log(1)
    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
            <img src={sampleImg} alt="" width="100" height="100" />
            <img src={svg} width="200" height="200" />
            <div id="css-svg-sample"></div>
            <Svg  width="200" height="200" viewBox="0 0 3500 3500"/>
        </div>
    )
}