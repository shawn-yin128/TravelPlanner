package com.project.trip.service.post;

import com.project.trip.exception.plan.PlanNotExistException;
import com.project.trip.exception.post.PostNotExistException;
import com.project.trip.model.plan.Plan;
import com.project.trip.model.post.Post;
import com.project.trip.repository.plan.PlanRepository;
import com.project.trip.repository.post.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class PostService {
    private PostRepository postRepository;
    private PlanRepository planRepository;
    private ImageStorageService imageStorageService;

    public Plan getPlansById(Long id) {
        return planRepository.findOneById(id);
    }

    public List<Post> getPost(String keyword) {
        return postRepository.findByDescription(keyword);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void addPost(Post post, MultipartFile cover) {
        Long planId = post.getPlanId();
        if (!planRepository.existsById(planId)) {
            throw new PlanNotExistException("Plan not exists.");
        }
        String url = imageStorageService.upload(cover);
        System.out.println(url);
        post.setCover(url);
        postRepository.save(post);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void deletePost(String id, String username) {
        System.out.println(id);
        System.out.println(username);
        if (!postRepository.existsByIdAndUsername(id, username)) {
            throw new PostNotExistException("Post not exists.");
        }
        postRepository.deleteById(id);
    }

    public List<Post> getPostsByUser(String username) {
        return postRepository.findByUsername(username);
    }
}
