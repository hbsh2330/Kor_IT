package com.hbsh.studymember.results.user;

public enum LoginResult {
    FAILURE, // 실패(이메일 혹은 비밀번호 틀림)
    FAILURE_SUSPENDED, // 실패(정지중)
    SUCCESS         // 성공
}
