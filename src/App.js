import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
