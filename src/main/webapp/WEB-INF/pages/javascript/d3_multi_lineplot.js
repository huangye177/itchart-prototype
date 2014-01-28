var timerMillSecond = 3000;
var random = Math.floor(Math.random() * 4);
var fileName;

//var fetchFileName = function()
//{
//    random = Math.floor(Math.random() * 4);
//    return "data/data3_" + random + ".tsv";
//};

var counter = 0;
var current_counter = 0;
var fetchFileName = function()
{
    current_counter = counter % 4;
    counter += 1;
    return "data/data3_" + current_counter + ".tsv";
};

var margin =
{
    top : 20,
    right : 80,
    bottom : 30,
    left : 50
}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

// parse dates
var parseDate = d3.time.format("%Y%m%d").parse;

// x-position encoding
var x = d3.time.scale().range([ 0, width ]);

// y-position encoding
var y = d3.scale.linear().range([ height, 0 ]);

var color = d3.scale.category10();

// display axes
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

// display line shape
var line = d3.svg.line().interpolate("basis").x(function(d)
{
    return x(d.date);
}).y(function(d)
{
    return y(d.temperature);
});

var svg = d3.select("#lineplot_controller").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var plot = function()
{
    svg = d3.select("#lineplot_controller").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv(fetchFileName(), function(error, data)
    {
        color.domain(d3.keys(data[0]).filter(function(key)
        {
            return key !== "date";
        }));

        data.forEach(function(d)
        {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function(name) {
            return {
              name: name,
              values: data.map(function(d) {
                return {date: d.date, temperature: +d[name]};
              })
            };
          });

        x.domain(d3.extent(data, function(d)
        {
            return d.date;
        }));

        y.domain([ d3.min(cities, function(c)
        {
            return d3.min(c.values, function(v)
            {
                return v.temperature;
            });
        }), d3.max(cities, function(c)
        {
            return d3.max(c.values, function(v)
            {
                return v.temperature;
            });
        }) ]);

        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

        svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
                "text-anchor", "end").text("Temperature (ºF)");

        var city = svg.selectAll(".city").data(cities).enter().append("g").attr("class", "city");

        city.append("path").attr("class", "line").attr("d", function(d)
        {
            return line(d.values);
        }).style("stroke", function(d)
        {
            return color(d.name);
        });

        city.append("text").datum(function(d)
                { return {name: d.name, value: d.values[d.values.length - 1]}; }
        ).attr("transform", function(d)
        {
            return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
        }).attr("x", 3).attr("dy", ".35em").text(function(d)
        {
            return d.name;
        });
    });
};

var rebind = function() {
    
    d3.select("svg").remove();
    
    svg = d3.select("#lineplot_controller").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var tsvData = d3.tsv(fetchFileName(), function(error, data)
            {
                color.domain(d3.keys(data[0]).filter(function(key)
                {
                    return key !== "date";
                }));

                data.forEach(function(d)
                {
                    d.date = parseDate(d.date);
                });

                var cities = color.domain().map(function(name) {
                    return {
                      name: name,
                      values: data.map(function(d) {
                        return {date: d.date, temperature: +d[name]};
                      })
                    };
                  });

                x.domain(d3.extent(data, function(d)
                {
                    return d.date;
                }));

                y.domain([ d3.min(cities, function(c)
                {
                    return d3.min(c.values, function(v)
                    {
                        return v.temperature;
                    });
                }), d3.max(cities, function(c)
                {
                    return d3.max(c.values, function(v)
                    {
                        return v.temperature;
                    });
                }) ]);

                svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
                        "text-anchor", "end").text("Temperature (ºF)");

                var city = svg.selectAll(".city").data(cities).enter().append("g").attr("class", "city");

                city.append("path").attr("class", "line").attr("d", function(d)
                {
                    return line(d.values);
                }).style("stroke", function(d)
                {
                    return color(d.name);
                });

                city.append("text").datum(function(d)
                        { return {name: d.name, value: d.values[d.values.length - 1]}; }
                ).attr("transform", function(d)
                {
                    return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
                }).attr("x", 3).attr("dy", ".35em").text(function(d)
                {
                    return d.name;
                });
            });
    
};

//set timer
var timer = $.timer(function() {
    return rebind();
});

$(document).ready(function()
{
    // ---------------- start of JQuery ready ----------------

    // start the timer
    timer.set(
    {
        time : timerMillSecond,
        autostart : true
    });
    
    return plot();

    // ---------------- end of JQuery ready ----------------

});