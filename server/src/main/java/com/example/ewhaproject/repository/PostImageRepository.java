package com.example.ewhaproject.repository;

import com.example.ewhaproject.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {
}