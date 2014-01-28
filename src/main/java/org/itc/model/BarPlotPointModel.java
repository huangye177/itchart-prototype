package org.itc.model;

import lombok.Data;

@Data
public class BarPlotPointModel
{
    private int key;
    private int value;

    public BarPlotPointModel(int key, int value)
    {
        this.key = key;
        this.value = value;
    }
}
