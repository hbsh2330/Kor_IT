package com.hbsh.studymember.utils;

import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CrytoUtil {
    public static String hashSha512(String input){
        return CrytoUtil.hashSha512(input, StandardCharsets.UTF_8, null);
    }
    public static String hashSha512(String input, Charset charset){
        return CrytoUtil.hashSha512(input, charset, null);
    }
    public static String hashSha512(String input, String fallback){
        return CrytoUtil.hashSha512(input, StandardCharsets.UTF_8, fallback);
    }
    public static String hashSha512(String input, Charset charset, String fallback){
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.reset();
            md.update(input.getBytes(charset));
            return String.format("%0128x", new BigInteger(1, md.digest()));
        } catch (NoSuchAlgorithmException e) {
            return fallback;
        }
    }
    private CrytoUtil(){

    }
}
