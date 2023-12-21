import './App.scss';
import { HashRouter, Route, Routes } from "react-router-dom";
import { TeamPage } from "./pages/TeamPage";
import MatchPage from "./pages/MatchPage";
import HomePage from "./pages/HomePage";
import React from "react";


function App() {
    return (
        <div className="App">
            <h3><a href="/">Home</a> </h3>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/teams/:teamName" element={<TeamPage/>}/>
                    <Route path="/teams/:teamName/matches/:year" element={<MatchPage/>}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
