package org.itc.model;

import lombok.Data;

@Data
public class Measurement
{
    private String datetime;
    private int value;

    public Measurement(String datetime, int value)
    {
        this.datetime = datetime;
        this.value = value;
    }
}
