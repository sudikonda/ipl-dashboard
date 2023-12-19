import React, { useEffect, useState } from 'react';
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useParams } from "react-router-dom";

/**
 * Renders the TeamPage component, which displays information about a specific team.
 *
 * @return {JSX.Element} The rendered TeamPage component.
 */
export const TeamPage = () => {

    const {teamName} = useParams();
    const [teamData, setTeamData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/team/${teamName}`)
            .then((response) => response.json())
            .then((data) => setTeamData(data));
    }, [teamName]);

    return (
        <div className="TeamPage">
            {(teamData && !teamData.teamName) ?
                <h1>Team: {teamName} not found</h1> :
                <>
                    <h1>{teamData["teamName"] || teamName}</h1>
                    <h2>total matches: {teamData["totalMatches"]}</h2>
                    <h2>total wins: {teamData["totalWins"]}</h2>
                    <MatchDetailCard teamName={teamName} match={teamData.matches?.[0]}/>

                    {(teamData.matches && teamData.matches.length > 0) &&
                        teamData.matches?.map(match => <MatchSmallCard key={match.id} teamName={teamName} match={match}/>)}
                </>
            }
        </div>
    );
}
