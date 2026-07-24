package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.entity.WebsiteFeedback;
import com.foodrescue.repository.WebsiteFeedbackRepository;
import com.foodrescue.service.WebsiteFeedbackService;

@Service
public class WebsiteFeedbackServiceImpl implements WebsiteFeedbackService {

    @Autowired
    private WebsiteFeedbackRepository repository;

    @Override
    public WebsiteFeedback saveFeedback(WebsiteFeedback feedback) {

        feedback.setCreatedAt(LocalDateTime.now());

        return repository.save(feedback);
    }

    @Override
    public List<WebsiteFeedback> getAllFeedback() {

        return repository.findAll();
    }
}