import React, { useState } from 'react';
import { unixEpochInMs } from './common';

export default function App(): JSX.Element {
    const [state] = useState(unixEpochInMs)
    console.log(1)
    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
        </div>
    )
}