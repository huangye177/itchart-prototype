package org.itc.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class LinePlotModel
{
    private String plotName = "";

    private List<LinePlotPointModel> pointList = new ArrayList<LinePlotPointModel>();

    public LinePlotModel(String plotName)
    {
        this.plotName = plotName;
    }

    public void addPoint(String datetime, int value)
    {
        this.pointList.add(new LinePlotPointModel(datetime, value));
    }

    public void addPoint(LinePlotPointModel point)
    {
        this.pointList.add(point);
    }

}
