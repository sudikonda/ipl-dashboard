import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TeamPage } from "./pages/TeamPage";
import MatchPage from "./pages/MatchPage";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                        <Route path="/teams/:teamName/matches/:year" element={<MatchPage/>}/>
                        <Route path="/teams/:teamName" element={<TeamPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
