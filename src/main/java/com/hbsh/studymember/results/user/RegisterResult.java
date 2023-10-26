package com.hbsh.studymember.results.user;

public enum RegisterResult {
    FAILURE, //일반 실패
    FAILURE_DUPLICATE_EMAIL, // 이메일 중복 실패
    FAILURE_DUPLICATE_NICKNAME, // 닉네임 중복 실패
    FAILURE_DUPLICATE_CONTACT, // 연락처 중복 실패
    SUCCESS // 성공
}
