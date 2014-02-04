package org.itc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class D3Controller
{

    @RequestMapping(value = "d3", method = RequestMethod.GET)
    public String showd3()
    {
        return "redirect:/pages/d3_barplot.html";
    }

}
