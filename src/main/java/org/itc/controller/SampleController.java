package org.itc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SampleController {
	
	@RequestMapping("/")
	public String loadDefaultPage(Model m) {
		m.addAttribute("name", "ITChart");
		return "home";
	}
	
	@RequestMapping("home")
	public String loadHomePage(Model m) {
		m.addAttribute("name", "ITChart");
		return "home";
	}
}
