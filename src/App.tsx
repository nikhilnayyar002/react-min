import React, { useState } from 'react';
import { unixEpochInMs } from './common';
import sampleImg from './assets/sample.jpeg';
import sampleJson from './assets/sample.json';

console.log(sampleJson.hello)

export default function App(): JSX.Element {
    const [state] = useState(unixEpochInMs)
    console.log(1)
    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
            <img src={sampleImg} alt="" width="100" height="100" />
        </div>
    )
}