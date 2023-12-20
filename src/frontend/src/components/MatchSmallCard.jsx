import React from 'react';
import { Link } from "react-router-dom";

export const MatchSmallCard = ({teamName, match}) => {

    if (!match) {
        return null;
    }

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const isMatchWon = teamName === match.matchWinner;

    return (
        <div className={isMatchWon ? "MatchSmallCard won-card" : "MatchSmallCard lost-card"}>
            <span className="vs">vs</span>
            <h1><Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></h1>
            <h3 className="match-result">{match["matchWinner"]} won by {match["resultMargin"]} {match["result"]}</h3>
        </div>
    );
};
