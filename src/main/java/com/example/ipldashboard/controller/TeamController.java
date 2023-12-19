package com.example.ipldashboard.controller;

import com.example.ipldashboard.domain.Match;
import com.example.ipldashboard.domain.Team;
import com.example.ipldashboard.repository.MatchRepository;
import com.example.ipldashboard.repository.TeamRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
public class TeamController {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public ResponseEntity<?> getTeamName(@PathVariable String teamName) {
        Team byTeamName = teamRepository.findByTeamName(teamName);
        Pageable pageable = PageRequest.of(0, 4);
        if (Objects.nonNull(byTeamName)) {
            String nameOfTeam = byTeamName.getTeamName();
            List<Match> matchesByTeamName = matchRepository.findLatestMatchesByTeam(nameOfTeam, 4);
            byTeamName.setMatches(matchesByTeamName);
            return ResponseEntity.ok(byTeamName);
        } else {
            String errorMessage = "Team: " + teamName + " not found";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
    }
}
