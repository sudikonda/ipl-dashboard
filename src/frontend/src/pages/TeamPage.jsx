import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useParams } from "react-router-dom";
import "./TeamPage.scss";

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
                <div><h1 className="team-name">Team: {teamName} not found</h1></div> :
                <>
                    <div className="team-name-section"><h1 className="team-name">{teamData["teamName"] || teamName}</h1></div>
                    <div className="win-loss-section">Wins/Losses
                        <PieChart
                            animate={true}
                            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                            labelStyle={{ fontSize: '5px', fill: '#fff' }}
                            data={[
                                { title: 'Wins', value: teamData["totalWins"], color: '#f4a261' , key: 'wins'},
                                { title: 'Losses', value: teamData["totalMatches"] - teamData["totalWins"], color: '#e76f51', key: 'losses' },
                            ]}
                        />;</div>
                    <div className="match-detail-section" ><MatchDetailCard teamName={teamName} match={teamData.matches?.[0]}/></div>

                    {(teamData.matches && teamData.matches.length > 0) &&
                        teamData.matches?.slice(1).map(match => <MatchSmallCard key={match.id} teamName={teamName}
                                                                       match={match}/>)}
                    <div className="more-link"><a href="#">More ></a> </div>
                </>
            }
        </div>
    );
}
