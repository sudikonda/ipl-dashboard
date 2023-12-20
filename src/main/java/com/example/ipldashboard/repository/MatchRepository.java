package com.example.ipldashboard.repository;

import com.example.ipldashboard.domain.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    default List<Match> findLatestMatchesByTeam(String teamName, int count) {
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count)).stream()
                .limit(count)
                .toList();
    }

    @Query("SELECT m FROM Match m " +
            "WHERE (m.team1 = :teamName OR m.team2 = :teamName) AND m.date BETWEEN :startDate AND :endDate " +
            "OR (m.team1 = :teamName OR m.team2 = :teamName) AND m.date BETWEEN :startDate AND :endDate " +
            "ORDER BY m.date DESC")
    List<Match> getMatchesByTeamAndDate(String teamName, LocalDate startDate, LocalDate endDate);
}
