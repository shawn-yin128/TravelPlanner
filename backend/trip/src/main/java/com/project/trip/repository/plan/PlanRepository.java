package com.project.trip.repository.plan;

import com.project.trip.model.plan.Plan;
import com.project.trip.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query("SELECT p FROM Plan p WHERE p.user = ?1")
    List<Plan> findByUser(User user);

    Plan findOneById(Long id);

    Boolean existsByIdAndUser(Long id, User user);
}
