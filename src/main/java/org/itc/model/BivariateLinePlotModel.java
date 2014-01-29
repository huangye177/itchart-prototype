package org.itc.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class BivariateLinePlotModel
{
    private String plotName = "";

    private List<BivariateLinePlotPointModel> pointList = new ArrayList<BivariateLinePlotPointModel>();

    public BivariateLinePlotModel(String plotName)
    {
        this.plotName = plotName;
    }

    public void addPoint(String datetime, int lowvalue, int highvalue)
    {
        this.pointList.add(new BivariateLinePlotPointModel(datetime, lowvalue, highvalue));
    }

    public void addPoint(BivariateLinePlotPointModel point)
    {
        this.pointList.add(point);
    }

}
