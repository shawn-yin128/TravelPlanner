package com.project.trip.handler.plan;

import com.project.trip.model.plan.DailyPlan;
import com.project.trip.model.plan.Plan;
import com.project.trip.model.user.User;
import com.project.trip.service.plan.PlanService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "Authorization, Content-Type", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class PlanHandler {
    private PlanService planService;

    @GetMapping("/plans")
    public List<Plan> getPlans(Principal principal) {
        String username = principal.getName();
        return planService.getPlans(username);
    }

    @PostMapping("/plans")
    public void addPlan(@RequestBody Plan plan, Principal principal) {
        User user = new User();
        user.setUsername(principal.getName());
        plan.setUser(user);
        System.out.println(plan);
        for (DailyPlan dailyPlan : plan.getPlanDetails()) {
            dailyPlan.setPlan(plan);
        }
        planService.addPlan(plan);
    }

    @DeleteMapping("/plans/{planId}")
    public void deletePlan(@PathVariable Long planId, Principal principal) {
        planService.deletePlan(planId, principal.getName());
    }
}
