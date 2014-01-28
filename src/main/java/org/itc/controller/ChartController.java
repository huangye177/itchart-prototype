package org.itc.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.itc.model.BarPlotModel;
import org.itc.model.BarPlotPointModel;
import org.itc.model.LinePlotModel;
import org.itc.model.LinePlotPointModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ChartController
{
    private int lastSentKey = 19;
    private int max = 20, min = 20;

    private Date currentLineDate = new Date();
    private int currentLineValue = 10;

    @RequestMapping(value = "/chart/barplot", method = RequestMethod.GET)
    public @ResponseBody
    BarPlotModel getBarPlotInJSON()
    {

        BarPlotModel barPlotModel = new BarPlotModel("BarPlot");
        barPlotModel.addPoint(0, 5);
        barPlotModel.addPoint(1, 10);
        barPlotModel.addPoint(2, 13);
        barPlotModel.addPoint(3, 19);
        barPlotModel.addPoint(4, 21);
        barPlotModel.addPoint(5, 25);
        barPlotModel.addPoint(6, 22);
        barPlotModel.addPoint(7, 18);
        barPlotModel.addPoint(8, 15);
        barPlotModel.addPoint(9, 13);
        barPlotModel.addPoint(10, 11);
        barPlotModel.addPoint(11, 12);
        barPlotModel.addPoint(12, 15);
        barPlotModel.addPoint(13, 20);
        barPlotModel.addPoint(14, 18);
        barPlotModel.addPoint(15, 17);
        barPlotModel.addPoint(16, 16);
        barPlotModel.addPoint(17, 18);
        barPlotModel.addPoint(18, 23);
        barPlotModel.addPoint(19, 25);

        // update key, which starts from 0
        this.lastSentKey = barPlotModel.getPointList().size() - 1;

        return barPlotModel;

    }

    @RequestMapping(value = "/chart/barplot/update/{limit}", method = RequestMethod.GET)
    public @ResponseBody
    BarPlotPointModel getBarPlotInJSON(@PathVariable("limit") String limit)
    {
        Random random = new Random();

        // set a max limit if available
        if (limit == null || limit.isEmpty())
        {
            // no new limit will be set
        }
        else
        {
            // get new given max limit
            try
            {
                this.max = Integer.parseInt(limit);
                this.max = (this.max < this.min) ? this.min : this.max;
            }
            catch (NumberFormatException e)
            {
                this.max = 20;
            }
        }

        // generate new value according to the updated max limit
        // int randomNumber = (int) (Math.random() * random.nextInt(Math.abs(max
        // - min) + 1) + min);

        int randomNumber = (int) Math.floor(Math.random() * max);

        System.out.println("max: " + this.max + "; randomNumber: " + randomNumber);

        /*
         * send the model response, and update the key value for next model
         * response indexing & axis tracking
         */
        BarPlotPointModel barPlotPointModel = new BarPlotPointModel(this.lastSentKey + 1, Math.abs(randomNumber));

        this.lastSentKey++;

        return barPlotPointModel;

    }

    @RequestMapping(value = "/chart/barplot/update/", method = RequestMethod.GET)
    public @ResponseBody
    BarPlotPointModel updateBarPlotInJSON()
    {
        int randomNumber = (int) Math.floor(Math.random() * max);

        System.out.println("max: " + this.max + "; randomNumber: " + randomNumber);

        /*
         * send the model response, and update the key value for next model
         * response indexing & axis tracking
         */
        BarPlotPointModel barPlotPointModel = new BarPlotPointModel(this.lastSentKey + 1, Math.abs(randomNumber));

        this.lastSentKey++;

        return barPlotPointModel;

    }

    @RequestMapping(value = "/chart/barplot/max", method = RequestMethod.GET)
    public @ResponseBody
    int getBarPlotMaxInJSON()
    {
        return this.max;
    }

    @RequestMapping(value = "/chart/barplot/max/{limit}", method = RequestMethod.POST)
    public @ResponseBody
    int setBarPlotInJSON(@PathVariable("limit") String limit)
    {
        System.out.println("New Max value set: " + limit);

        // set a max limit if available
        if (limit == null || limit.isEmpty())
        {
            // no new limit will be set
        }
        else
        {
            // get new given max limit
            try
            {
                this.max = Integer.parseInt(limit);
                this.max = (this.max < this.min) ? this.min : this.max;
            }
            catch (NumberFormatException e)
            {
                this.max = 20;
            }
        }

        return this.max;

    }

    @RequestMapping(value = "/chart/lineplot", method = RequestMethod.GET)
    public @ResponseBody
    LinePlotModel getLinePlotInJSON()
    {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date nowDate = new Date();
        Calendar calendar = Calendar.getInstance();

        int dayBefore = 30;
        int max = 10;

        calendar.setTime(nowDate);
        calendar.add(Calendar.DAY_OF_YEAR, (-1 * dayBefore));
        Date startDate = calendar.getTime();

        LinePlotModel linePlotModel = new LinePlotModel("LinePlot");

        for (int i = 0; i < dayBefore; i++)
        {
            calendar.setTime(startDate);
            calendar.add(Calendar.DAY_OF_YEAR, i);
            this.currentLineDate = calendar.getTime();

            this.currentLineValue += (int) Math.floor(Math.random() * max) - (max / 3);

            LinePlotPointModel newPoint = new LinePlotPointModel(dateFormat.format(this.currentLineDate), this.currentLineValue);
            linePlotModel.addPoint(newPoint);
        }

        return linePlotModel;

    }

    @RequestMapping(value = "/chart/lineplot/update", method = RequestMethod.GET)
    public @ResponseBody
    LinePlotPointModel getLinePlotPointInJSON()
    {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(this.currentLineDate);
        calendar.add(Calendar.DAY_OF_YEAR, 1);
        this.currentLineDate = calendar.getTime();

        this.currentLineValue += (int) Math.floor(Math.random() * max) - (max / 3);

        LinePlotPointModel newPoint = new LinePlotPointModel(dateFormat.format(this.currentLineDate), this.currentLineValue);

        return newPoint;

    }
}