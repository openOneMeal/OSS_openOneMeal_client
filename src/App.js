import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
