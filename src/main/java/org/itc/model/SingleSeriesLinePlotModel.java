package org.itc.model;

import java.util.List;

import lombok.Data;

@Data
public class SingleSeriesLinePlotModel
{
    private String dataSeriesName;
    private List<Measurement> measurement;

    public SingleSeriesLinePlotModel(String dataSeriesName, List<Measurement> measurement)
    {
        this.dataSeriesName = dataSeriesName;
        this.measurement = measurement;
    }
}
