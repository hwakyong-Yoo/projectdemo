package com.example.ewhaproject.service;

import com.example.ewhaproject.dto.PostDto;
import com.example.ewhaproject.entity.Post;
import com.example.ewhaproject.repository.PostRepository;
import com.example.ewhaproject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    public PostDto create(PostDto dto) {
        Post post = dto.toEntity();
        Post createdPost = postRepository.save(post);
        log.info("DB에 게시물 저장 성공");
        return PostDto.createdPostDto(createdPost);
    }

    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(PostDto::createdPostDto)
                .collect(Collectors.toList());
    }

    public void updatePostToLatest(Long postId) { //끝올
        Post post = postRepository.findById(postId).orElse(null);

        if (post != null) {
            String currentFormattedDate = PostDto.getCurrentFormattedDate();
            post.setDate(currentFormattedDate);
            postRepository.save(post);
        }
    }

    public List<Post> findPostsByUserId(String userId) {
        return postRepository.findByUserId(userId);
    }

    public Optional<Post> getPostByPostId(Long postId) {
        return postRepository.findById(postId);
    }
}
