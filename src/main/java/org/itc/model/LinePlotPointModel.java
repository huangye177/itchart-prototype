package org.itc.model;

import lombok.Data;

@Data
public class LinePlotPointModel
{
    private String datetime;
    private int value;

    public LinePlotPointModel(String datetime, int value)
    {
        this.datetime = datetime;
        this.value = value;
    }
}
