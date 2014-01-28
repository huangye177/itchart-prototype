package org.itc.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class BarPlotModel
{
    private String plotName = "";

    private List<BarPlotPointModel> pointList = new ArrayList<BarPlotPointModel>();

    public BarPlotModel(String plotName)
    {
        this.plotName = plotName;
    }

    public void addPoint(int key, int value)
    {
        this.pointList.add(new BarPlotPointModel(key, value));
    }

}
