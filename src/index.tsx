import "@styles/index.css";

import ReactDOM from "react-dom";
import React, { useState } from 'react';

export const unixEpochInMs = Date.now()

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


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
