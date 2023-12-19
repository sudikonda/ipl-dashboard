import React from 'react';

export const MatchSmallCard = (props) => {

    const { match } = props;
    return (
        <div className="MatchSmallCard">
            <p>{match["date"]} - {match["team1"]} vs {match["team2"]}</p>
        </div>
    );
};
