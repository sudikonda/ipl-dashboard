import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import "./MatchPage.scss";
import YearSelection from "../components/YearSelection";

const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const {teamName, year} = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches/${year}`)
            .then((response) => response.json())
            .then((data) => setMatches(data.matches));
    }, [teamName, year]);

    return (
        <div className="MatchPage">


            <div className="year-selection">
                <h3>Select Year</h3>
                <YearSelection teamName={teamName}/>
            </div>

            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {matches.map((match) => (
                    <MatchDetailCard key={match.id} teamName={teamName} match={match}/>
                ))}
            </div>
        </div>
    );
};

export default MatchPage;