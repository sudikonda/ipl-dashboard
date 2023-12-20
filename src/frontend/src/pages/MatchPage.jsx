import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const {teamName, year} = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/team/${teamName}/matches/${year}`)
            .then((response) => response.json())
            .then((data) => setMatches(data.matches));
    }, [teamName, year]);

    return (
        <div className="MatchPage">
            <h1>Match Page</h1>
            <p>Team Name: {teamName}</p>
            <p>Year: {year}</p>
            <p>Matches: {matches.length}</p>
            {matches.map((match) => (
                <div key={match.id}>
                    <p>Team 1: {match.team1}</p>
                    <p>Team 2: {match.team2}</p>
                    <p>Match Winner: {match.matchWinner}</p>
                    <p>Result: {match.result}</p>
                    <p>Result Margin: {match.resultMargin}</p>
                    <p>Match Date: {match.date}</p>
                    <p>Venue: {match.venue}</p>
                </div>))}
        </div>
    );
};

export default MatchPage;