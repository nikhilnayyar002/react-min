import { Modal } from 'bootstrap';
import{ useEffect, useState } from 'react';

export default function App() {
    const [state] = useState(Date.now())

    useEffect(()=>{
        if(document.getElementById("myModal")) {
            let elem = document.getElementById("myModal")
            let modal = new Modal(elem)
            modal.hide()
        }
    },[])

    return (
        <div>
            <div>Hello WORLD</div>
            <div>{state}</div>
        </div>
    )
}