import React from 'react';
import { Link } from "react-router-dom";

export const MatchSmallCard = ({teamName, match}) => {

    if (!match) {
        return null;
    }

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;

    return (
        <div className="MatchSmallCard">
            <p>vs <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></p>
            <h3>{match["matchWinner"]} won by {match["resultMargin"]} {match["result"]}</h3>
        </div>
    );
};
