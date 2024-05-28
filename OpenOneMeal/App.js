import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import Matching from "./pages/Matching";
import Chat from "./pages/Chat";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<SignIn />} />
                <Route path="/matching" element={<Matching />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
