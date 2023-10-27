package com.hbsh.studymember.mapper;

import com.hbsh.studymember.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int insertUser(UserEntity user);

    UserEntity selectUserByEmail(@Param(value = "email") String email);
}
