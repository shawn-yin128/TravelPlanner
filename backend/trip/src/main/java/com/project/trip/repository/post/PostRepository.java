package com.project.trip.repository.post;

import com.project.trip.model.post.Post;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends ElasticsearchRepository<Post, String> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"description\": \"?0\"}}]}}")
    List<Post> findByDescription(String description);

    List<Post> findByUsername(String username);

    Boolean existsByIdAndUsername(String id, String username);
}
