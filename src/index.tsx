import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import "@styles/index.css";

const unixEpochInMs = Date.now();
function App() {
    const [state] = useState(unixEpochInMs);
    console.log(2);
    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
        </div>
    );
}

// Render your React component instead
const elem = document.getElementById('root') as HTMLElement;
const root = createRoot(elem);
root.render(<StrictMode><App /></StrictMode>);

