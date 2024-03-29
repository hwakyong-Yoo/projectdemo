package com.example.ewhaproject.service;

import com.example.ewhaproject.entity.Keyword;
import com.example.ewhaproject.repository.KeywordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeywordService {
    @Autowired
    private KeywordRepository keywordRepository;
    public Keyword findByName(String keywordName) { return keywordRepository.findByKeyword(keywordName);
    }

    public List<String> findKeywordsByPostId(Long postId) {
        return keywordRepository.findKeywordsByPostId(postId);
    }

    public void save(Keyword keyword) { keywordRepository.save(keyword);
    }
}
