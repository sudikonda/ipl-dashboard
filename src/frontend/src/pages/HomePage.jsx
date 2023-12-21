import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import TeamTile from "../components/TeamTile";
import './HomePage.scss';

const HomePage = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams`)
            .then((response) => response.json())
            .then((data) => setTeams(data));
    }, []);

    return (
        <div>
          <div className="HomePage">
              <div className="header-section">
                  <h1 className="app-name">IPL Dashboard</h1>
              </div>
              <div className="team-grid">
                  {teams.map(team => <TeamTile key={team.teamName} teamName={team.teamName}/>)}
              </div>
          </div>
        </div>
    );
};

export default HomePage;