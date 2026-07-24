package com.foodrescue.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.foodrescue.entity.WebsiteFeedback;

@Repository
public interface WebsiteFeedbackRepository extends JpaRepository<WebsiteFeedback, Long> {

}