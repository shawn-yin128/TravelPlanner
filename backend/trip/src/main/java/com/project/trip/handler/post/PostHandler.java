package com.project.trip.handler.post;

import com.project.trip.model.plan.Plan;
import com.project.trip.model.post.Post;
import com.project.trip.service.post.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "Authorization, Content-Type", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class PostHandler {
    private PostService postService;

    @GetMapping("/posts")
    public List<Post> getPosts(@RequestParam("keyword") String keywords) {
        return postService.getPost(keywords);
    }

    @GetMapping("/posts/plan/{planId}")
    public Plan getPlan(@PathVariable Long planId) {
        return postService.getPlansById(planId);
    }

    @GetMapping("/posts/user")
    public List<Post> getPostsByUser(Principal principal) {
        return postService.getPostsByUser(principal.getName());
    }

    @PostMapping("/posts")
    public void addPost(@RequestParam("cover") MultipartFile cover,
                        @RequestParam("title") String title,
                        @RequestParam("description") String description,
                        @RequestParam("plan_id") Long planId,
                        Principal principal) {
        Post post = new Post();
        post.setId(Long.toString(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE));
        System.out.println(post.getId());
        post.setTitle(title);
        post.setDescription(description);
        post.setPlanId(planId);
        post.setUsername(principal.getName());
        postService.addPost(post, cover);
    }

    @DeleteMapping("/posts/{postId}")
    public void deletePost(@PathVariable String postId, Principal principal) {
        postService.deletePost(postId, principal.getName());
    }
}
