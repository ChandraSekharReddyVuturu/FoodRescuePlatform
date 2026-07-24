package com.foodrescue.service;

import java.util.List;
import com.foodrescue.entity.WebsiteFeedback;

public interface WebsiteFeedbackService {

    WebsiteFeedback saveFeedback(WebsiteFeedback feedback);

    List<WebsiteFeedback> getAllFeedback();

}