import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import Match from "./pages/Match";
import Chat from "./pages/Chat";
import MissionList from "./pages/MissionList"; // 미션 리스트 컴포넌트 임포트

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/match" element={<Match />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
