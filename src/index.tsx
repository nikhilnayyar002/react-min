import "@styles/index.scss";

import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from "react";

const unixEpochInMs = Date.now();

function App() {
  const [state] = useState(unixEpochInMs);
  console.log(1);
  return (
    <div>
      <div>Hello WORLD</div>
      <div>{state}</div>
    </div>
  );
}

const container = document.getElementById("root") as HTMLElement
createRoot(container).render(<StrictMode><App /></StrictMode>);