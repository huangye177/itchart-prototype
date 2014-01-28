package org.itc.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "staffName", "name" })
public class Greeter
{
    String name;
    String staffName[];

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String[] getStaffName()
    {
        return staffName;
    }

    public void setStaffName(String[] staffName)
    {
        this.staffName = staffName;
    }
}