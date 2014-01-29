package org.itc.model;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class MultiseriesLinePlotModel
{
    private String plotName = "";

    private Map<String, SingleSeriesLinePlotModel> pointMap = new HashMap<String, SingleSeriesLinePlotModel>();

    public MultiseriesLinePlotModel(String plotName)
    {
        this.plotName = plotName;
    }

    public void addDataSeries(String dsName, SingleSeriesLinePlotModel dsPlotModel)
    {
        this.pointMap.put(dsName, dsPlotModel);
    }
}
