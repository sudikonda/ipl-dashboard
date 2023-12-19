import React, { useEffect, useState } from 'react';
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";

export const TeamPage = (props) => {

    const {teamName} = props;
    const [teamData, setTeamData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/team/${teamName}`)
            .then((response) => response.json())
            .then((data) => setTeamData(data));
    }, [teamName]);

    return (
        <div className="TeamPage">
            <h1>{teamData["teamName"] || teamName}</h1>
            <h2>total matches: {teamData["totalMatches"]}</h2>
            <h2>total wins: {teamData["totalWins"]}</h2>
            <MatchDetailCard/>

            {(teamData.matches && teamData.matches.length > 0) &&
                teamData.matches?.map(match => <MatchSmallCard key={match.id} match={match}/>)}

        </div>
    );
}
