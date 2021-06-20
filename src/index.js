import ReactDOM from 'react-dom';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

function App() {
    return (
        <div>
            <div></div>
            <div>
                <textarea name="myInput" id="" rows="1"></textarea>
            </div>
        </div>
    )
}