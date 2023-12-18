package com.example.ipldashboard.config;

import com.example.ipldashboard.domain.Team;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager entityManager;

    public JobCompletionNotificationListener(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String, Team> teamMap = new HashMap<>();

            String query1 = "SELECT m.team1, COUNT(*) FROM Match m GROUP BY m.team1";
            entityManager.createQuery(query1, Object[].class)
                    .getResultList()
                    .stream()
                    .map(e -> new Team((String) e[0], (long) e[1]))
                    .forEach(team -> teamMap.put(team.getTeamName(), team));

            String query2 = "SELECT m.team2, COUNT(*) FROM Match m GROUP BY m.team2";
            entityManager.createQuery(query2, Object[].class)
                    .getResultList()
                    .forEach(e -> {
                        Team team = teamMap.get((String) e[0]);
                        team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
                    });

            String query3 = "SELECT m.matchWinner, COUNT(*) FROM Match m GROUP BY m.matchWinner";
            entityManager.createQuery(query3, Object[].class)
                    .getResultList()
                    .forEach(e -> {
                        Team team = teamMap.get((String) e[0]);
                        if (team != null) {
                            team.setTotalWins((long) e[1]);
                        }
                    });

            teamMap.values().forEach(entityManager::persist);

            teamMap.values().forEach(System.out::println);
        }
    }
}
