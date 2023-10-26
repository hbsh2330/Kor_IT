package com.hbsh.studymember.services;

import com.hbsh.studymember.entities.UserEntity;
import com.hbsh.studymember.results.user.RegisterResult;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public RegisterResult register(UserEntity user){
        /*
        성공
        실패(이미 사용중인 이메일)
        실패(이미 사용중인 닉네임)
        실패(잘못된 값)
         */
        return RegisterResult.SUCCESS;
    }
}
