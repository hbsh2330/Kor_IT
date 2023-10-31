package com.hbsh.studymember.services;

import com.hbsh.studymember.entities.UserEntity;
import com.hbsh.studymember.mapper.UserMapper;
import com.hbsh.studymember.results.user.LoginResult;
import com.hbsh.studymember.results.user.RegisterResult;
import com.hbsh.studymember.utils.CrytoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service
public class UserService {
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public LoginResult login(UserEntity user){
        if (user.getEmail() == null || user.getPassword() == null ||
                !user.getEmail().matches("^(?=.{4,50}$)([\\da-z_\\-.]{4,})@([\\da-z][\\da-z\\-]*[\\da-z]\\.)?([\\da-z][\\da-z\\-]*[\\da-z])\\.([a-z]{2,15}\\.)?([a-z]{2,3})$") ||
                !user.getPassword().matches("^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:'\",<.>/?]{4,50})$")){
            return LoginResult.FAILURE;
        }
        UserEntity dbUser = this.userMapper.selectUserByEmail(user.getEmail());
        if (dbUser == null){
            return LoginResult.FAILURE;
        }
        user.setPassword(CrytoUtil.hashSha512(user.getPassword()));
        if (!user.getPassword().equals(dbUser.getPassword())){
            return LoginResult.FAILURE;
        }
        if (dbUser.isSuspended()){
            return LoginResult.FAILURE_SUSPENDED;
        }
        if (dbUser.isDeleted()){
            return LoginResult.FAILURE;
        }
        user.setEmail(dbUser.getEmail());
        user.setPassword(dbUser.getPassword());
        user.setNickname(dbUser.getNickname());
        user.setContactFirst(dbUser.getContactFirst());
        user.setContactSecond(dbUser.getContactSecond());
        user.setContactThird(dbUser.getContactThird());
        user.setAddressPostal(dbUser.getAddressPostal());
        user.setAddressPrimary(dbUser.getAddressPrimary());
        user.setAddressSecondary(dbUser.getAddressSecondary());
        user.setRegisteredAt(dbUser.getRegisteredAt());
        user.setSuspended(dbUser.isSuspended());
        user.setDeleted(dbUser.isDeleted());

        return LoginResult.SUCCESS;
    }

    public RegisterResult register(UserEntity user) throws NoSuchAlgorithmException {
        if (user.getEmail() == null ||
                user.getPassword() == null ||
                user.getNickname() == null ||
                user.getContactFirst() == null ||
                user.getContactSecond() == null ||
                user.getContactThird() == null ||
                user.getAddressPostal() == null ||
                user.getAddressPrimary() == null ||
                user.getAddressSecondary() == null ||
                !user.getEmail().matches("^(?=.{4,50}$)([\\da-z_\\-.]{4,})@([\\da-z][\\da-z\\-]*[\\da-z]\\.)?([\\da-z][\\da-z\\-]*[\\da-z])\\.([a-z]{2,15}\\.)?([a-z]{2,3})$") ||
                !user.getPassword().matches("^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:'\",<.>/?]{4,50})$") ||
                !user.getNickname().matches("^([\\da-zA-Z가-힣]{2,10})$") ||
                !user.getContactFirst().matches("^(010)$") ||
                !user.getContactSecond().matches("^([\\d]{3,4})$") ||
                !user.getContactThird().matches("^([\\d]{4})$")) {
            return RegisterResult.FAILURE;
        }
        if (this.userMapper.selectUserByEmail(user.getEmail()) != null) {
            return RegisterResult.FAILURE_DUPLICATE_EMAIL;
        }
        if (this.userMapper.selectUserByNickname(user.getNickname()) != null) {
            return RegisterResult.FAILURE_DUPLICATE_NICKNAME;
        }
        if (this.userMapper.selectUserByContact(
                user.getContactFirst(),
                user.getContactSecond(),
                user.getContactThird()) != null) {
            return RegisterResult.FAILURE_DUPLICATE_CONTACT;// 닉네임 중복, 연락처
        }// 중복확인 로직
            user.setRegisteredAt(new Date());
            user.setSuspended(false);
            user.setDeleted(false);
            user.setPassword(CrytoUtil.hashSha512(user.getPassword()));
            int insertResult = this.userMapper.insertUser(user);
            if (insertResult == 0) {
                return RegisterResult.FAILURE;
            }
            else {
                return RegisterResult.SUCCESS;
            }
        }
    }
