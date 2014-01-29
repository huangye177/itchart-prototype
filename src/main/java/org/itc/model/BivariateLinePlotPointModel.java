package org.itc.model;

import lombok.Data;

@Data
public class BivariateLinePlotPointModel
{
    private String datetime;
    private int lowvalue;
    private int highvalue;

    public BivariateLinePlotPointModel(String datetime, int lowvalue, int highvalue)
    {
        this.datetime = datetime;
        this.lowvalue = lowvalue;
        this.highvalue = highvalue;
    }
}
