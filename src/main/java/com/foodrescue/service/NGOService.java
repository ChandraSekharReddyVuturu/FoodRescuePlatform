package com.foodrescue.service;

import com.foodrescue.dto.NGODTO;
import com.foodrescue.dto.NGORegisterDTO;
import com.foodrescue.entity.NGO;

public interface NGOService {

	NGODTO registerNGO(NGORegisterDTO dto);;

    NGO getNGOById(Long ngoId);

    NGO updateNGO(Long ngoId, NGO ngo);
    
    NGODTO getNGOProfile(Long ngoId);

}