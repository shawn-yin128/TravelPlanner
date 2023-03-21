package com.project.trip.handler.user;

import com.project.trip.model.Token;
import com.project.trip.model.user.User;
import com.project.trip.service.user.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "Authorization, Content-Type", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.DELETE})
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class AuthenticationHandler {
    private AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public Token authenticateHost(@RequestBody User user) {
        return authenticationService.authenticate(user);
    }
}
