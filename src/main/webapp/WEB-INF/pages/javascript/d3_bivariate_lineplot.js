var margin =
{
    top : 20,
    right : 20,
    bottom : 30,
    left : 50
}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

var parseJSONDate = d3.time.format("%Y-%m-%d").parse;

var timerMillSecond = 2000;
var tickCount = 6;

var xScale = d3.time.scale().range([ 0, width ]);

var yScale = d3.scale.linear().range([ height, 0 ]);

var xAxis = d3.svg.axis();

var yAxis = d3.svg.axis();

var area = d3.svg.area().x(function(d) {return xScale(d.datetime)})
    .y0(function(d) {return yScale(d.lowvalue)})
    .y1(function(d) {return yScale(d.highvalue)});

var keyDatetime = function(d)
{
    return d.datetime;
};

var initialData;

/*
 * get updated data from RESTful and change HTML element accordingly 
 */
var refreshLineData = function()
{

    // load update data
    data_update_request = $.ajax(
    {
        url : "../chart/bivariatelineplot/update",
        type : "GET",
    });

    data_update_request.done(function(updateData)
    {
        updateData.datetime = parseJSONDate(updateData.datetime);

        // update initialData size
        initialData.push(
        {
            datetime : updateData.datetime,
            lowvalue : updateData.lowvalue,
            highvalue : updateData.highvalue
        });

        // update axis and line plot
//        d3.select("svg").remove();
//        d3.select("#footerid").remove();

        var svg = d3.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xScale.domain(d3.extent(initialData, function(d)
        {
            return d.datetime;
        }));

        yScale.domain(
            [
             d3.min(initialData, function(d) {return d.lowvalue; }), 
             d3.max(initialData, function(d) {return d.highvalue; })
            ]
        );
        
        // update axis
        xAxis.scale(xScale).orient("bottom");
        yAxis.scale(yScale).orient("left");
        
        svg.selectAll("#x-axis-id").call(xAxis);
        svg.selectAll("#y-axis-id").call(yAxis);
//        svg.selectAll("g.x.axis").call(xAxis);
//        svg.selectAll("g.y.axis").call(yAxis);
        
        svg.selectAll("#path-id").datum(initialData).attr("class", "area").attr("d", area);

    });
};

/*
 * set timer
 */
var lineTimer = $.timer(refreshLineData);

$(document).ready(
        function()
        {
            // ---------------- start of JQuery ready ----------------

            // start the timer
            lineTimer.set(
            {
                time : timerMillSecond,
                autostart : true
            });

            // prepare SVG

            var svg = d3.select("body").append("svg").attr("id", "bivariate_lineplot_svg_id").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append(
                    "g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            // load data
            data_update_request = $.ajax(
            {
                url : "../chart/bivariatelineplot/",
                type : "GET",
            });

            data_update_request.done(function(da)
            {
                initialData = da.pointList;

                initialData.forEach(function(d)
                {
                    d.datetime = parseJSONDate(d.datetime);
                });

                xScale.domain(d3.extent(initialData, function(d)
                {
                    return d.datetime;
                }));
                yScale.domain(
                    [
                     d3.min(initialData, function(d) {return d.lowvalue; }), 
                     d3.max(initialData, function(d) {return d.highvalue; })
                    ]
                );
             
                /*
                 * plot gridline
                 */
                xAxis.scale(xScale).orient("bottom").ticks(tickCount).tickSize(-height, -height, 0);
                yAxis.scale(yScale).orient("left").ticks(tickCount).tickSize(-width, -width, 0);

                // draw axis
                svg.append("g").attr("id", "x-axis-id").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                svg.append("g").attr("id", "y-axis-id").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
                        "text-anchor", "end").text("Measurement (in)");

                // draw line
                svg.append("path").attr("id", "path-id").datum(initialData).attr("class", "area").attr("d", area);
                
                // load footer
                $.getScript("javascript/d3_test_footer.js");

            });

            // ---------------- end of JQuery ready ----------------

        });