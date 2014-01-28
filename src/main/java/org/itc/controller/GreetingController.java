package org.itc.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.itc.model.Greeter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

@Controller
public class GreetingController
{

    @RequestMapping("/greeting")
    public String greeting(
            @RequestParam(value = "name", required = false, defaultValue = "World") String name,
            Model model)
    {
        model.addAttribute("name", name);
        return "greeting";
    }

    @RequestMapping(value = "/greeter/json/{name}", method = RequestMethod.GET)
    public @ResponseBody
    Greeter getGreeterInJSON(@PathVariable("name") String name)
    {

        Greeter greeter = new Greeter();
        if (name == null || name.isEmpty())
        {
            name = "default";
        }

        greeter.setName(name);
        greeter.setStaffName(new String[] { "staff_1", "staff_2" });

        return greeter;

    }

    @RequestMapping(value = "/greeter/json", method = RequestMethod.GET)
    public @ResponseBody
    Greeter getGreeterInJSON()
    {

        Greeter greeter = new Greeter();

        greeter.setName("default");
        greeter.setStaffName(new String[] { "staff_1", "staff_2" });

        return greeter;

    }

    @RequestMapping(value = "/greeter/csv", method = RequestMethod.GET, consumes = "text/csv")
    public @ResponseBody
    Greeter getGreeterInCSV(HttpServletResponse response)
    {
        Greeter greeter = new Greeter();

        greeter.setName("default");
        greeter.setStaffName(new String[] { "staff_1", "staff_2" });

        CsvMapper mapper = new CsvMapper();
        CsvSchema schema = mapper.schemaFor(Greeter.class);

        ObjectWriter writer = mapper.writer(schema.withLineSeparator("\n"));

        File greeterCSV = new File("greeterCSV.csv");

        try
        {
            writer.writeValue(greeterCSV, greeter);
        }
        catch (JsonGenerationException e)
        {
            e.printStackTrace();
        }
        catch (JsonMappingException e)
        {
            e.printStackTrace();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        return greeter;

    }
}