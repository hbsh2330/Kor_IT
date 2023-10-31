package com.hbsh.studymember.controllers;

import com.hbsh.studymember.entities.UserEntity;
import com.hbsh.studymember.results.user.LoginResult;
import com.hbsh.studymember.results.user.RegisterResult;
import com.hbsh.studymember.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;


@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "login", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getLogin(){
        return new ModelAndView("user/login");
    }
    @RequestMapping(value = "login", method = RequestMethod.POST, produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public String postLogin(HttpSession session, UserEntity user){
        LoginResult result = this.userService.login(user);
        if (result == LoginResult.SUCCESS){
            session.setAttribute("user", user);
        }
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @RequestMapping(value = "my", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMy(){
        return new ModelAndView("user/my");
    }

    @RequestMapping(value = "register", method = RequestMethod.GET)
    public ModelAndView getRegister(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user/register");
        return modelAndView;
    }

    @RequestMapping(value = "my", method = RequestMethod.PATCH, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchMy(@RequestParam(value = "newPassword", required = false) String newPassword, UserEntity alterUser, @SessionAttribute(value = "user") UserEntity user){
        return null;
    }

    @RequestMapping(value = "register",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)

    @ResponseBody
    public String postRegister(UserEntity user) throws NoSuchAlgorithmException {
        System.out.println("user.getEmail()");
        RegisterResult result = this.userService.register(user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }
}
