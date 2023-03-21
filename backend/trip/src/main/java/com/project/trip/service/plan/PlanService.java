package com.project.trip.service.plan;

import com.project.trip.exception.plan.InvalidPlanDateException;
import com.project.trip.exception.plan.PlanNotExistException;
import com.project.trip.model.plan.Plan;
import com.project.trip.model.user.User;
import com.project.trip.repository.plan.PlanRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class PlanService {
    private PlanRepository planRepository;

    public List<Plan> getPlans(String username) {
        User user = new User();
        user.setUsername(username);
        return planRepository.findByUser(user);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void addPlan(Plan plan) {
        LocalDate startDate = plan.getStartDate();
        LocalDate endDate = plan.getEndDate();
        if (startDate.isAfter(endDate)) {
            throw new InvalidPlanDateException("Invalid date.");
        }
        planRepository.save(plan);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void deletePlan(Long id, String username) {
        User user = new User();
        user.setUsername(username);
        if (!planRepository.existsByIdAndUser(id, user)) {
            throw new PlanNotExistException("Plan does not exist.");
        }
        planRepository.deleteById(id);
    }
}
