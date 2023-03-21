package com.project.trip.exception.post;

public class PostNotExistException extends RuntimeException {
    public PostNotExistException(String message) {
        super(message);
    }
}
