import { useEffect, useState } from "react";
import api from "./api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/")
            .then((res) => setMessage(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Backend says:</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;