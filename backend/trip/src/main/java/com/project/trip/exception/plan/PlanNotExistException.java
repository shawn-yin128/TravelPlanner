package com.project.trip.exception.plan;

public class PlanNotExistException extends RuntimeException {
    public PlanNotExistException(String message) {
        super(message);
    }
}
