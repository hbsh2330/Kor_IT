package com.hbsh.studymember.controllers;

import com.hbsh.studymember.entities.UserEntity;
import com.hbsh.studymember.results.user.RegisterResult;
import com.hbsh.studymember.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "register", method = RequestMethod.GET)
    public ModelAndView getRegister(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user/register");
        return modelAndView;
    }

    @RequestMapping(value = "register",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)

    @ResponseBody
    public String postRegister(UserEntity user){
        System.out.println("user.getEmail()");
        RegisterResult result = this.userService.register(user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }
}
