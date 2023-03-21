package com.project.trip.service.user;

import com.project.trip.exception.user.UserNotExistException;
import com.project.trip.model.Token;
import com.project.trip.model.user.User;
import com.project.trip.utils.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class AuthenticationService {
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public Token authenticate(User user) throws UserNotExistException {
        Authentication auth;
        try {
            auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch (AuthenticationException ex) {
            throw new UserNotExistException("User not exists.");
        }
        if (auth == null || !auth.isAuthenticated()) {
            throw new UserNotExistException("User not exists.");
        }
        return new Token(jwtUtils.generateToken(user.getUsername()));
    }
}