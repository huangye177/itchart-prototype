var dataset4 = [ 100, 200, 300, 400, 500 ];

var dataset2 = [ 5, 10, 15, 20, 25 ];

var dataset5 = [];
var numDataPoints = 10;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for ( var i = 0; i < numDataPoints; i++)
{
    var newNumber1 = Math.round(Math.random() * xRange);
    var newNumber2 = Math.round(Math.random() * yRange);
    dataset5.push([ newNumber1, newNumber2 ]);
}

var ww = 500;
var hh = 300;
var padding = 30;
var timerMillSecond = 2000;

var svg = d3.select("body").append("svg").attr("width", ww).attr("height", hh);

var xScale = d3.scale.linear().domain([ 0, d3.max(dataset5, function(d)
{
    return d[0];
}) ]).range([ padding, ww - padding * 2 ]);

var yScale = d3.scale.linear().domain([ 0, d3.max(dataset5, function(d)
{
    return d[1];
}) ]).range([ hh - padding, padding ]);

var rScale = d3.scale.linear().domain([ 0, d3.max(dataset5, function(d)
{
    return d[1];
}) ]).range([ 2, 5 ]);

// setup axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

var refreshScatterData = function()
{
    // New values for dataset
    var numValues = dataset5.length; // Count original length of
    // dataset
    var maxRange = Math.random() * 1000; // Max range of new
    // values
    dataset5 = []; // Initialize empty array
    for ( var i = 0; i < numValues; i++)
    { // Loop numValues times
        var newNumber1 = Math.floor(Math.random() * maxRange); // New
        // random
        // integer
        var newNumber2 = Math.floor(Math.random() * maxRange); // New
        // random
        // integer
        dataset5.push([ newNumber1, newNumber2 ]); // Add new
        // number to
        // array
    }

    // Update scale domains
    xScale.domain([ 0, d3.max(dataset5, function(d)
    {
        return d[0];
    }) ]);
    yScale.domain([ 0, d3.max(dataset5, function(d)
    {
        return d[1];
    }) ]);

    // Update all circles
    svg.selectAll("circle").data(dataset5).transition().duration(1000).each("start", function()
    { // <-- Executes at start of transition
        d3.select(this).attr("fill", "magenta").attr("r", 3);
    }).attr("cx", function(d)
    {
        return xScale(d[0]);
    }).attr("cy", function(d)
    {
        return yScale(d[1]);
    }).each("end", function()
    { // <-- Executes at end of transition
        d3.select(this).attr("fill", "black").attr("r", 2);
    });

    // update all text
    svg.selectAll("text").data(dataset5).transition().duration(1000).text(function(d)
    {
        return "[" + d[0] + "," + d[1] + "]";
    }).attr("x", function(d)
    {
        return xScale(d[0]);
    }).attr("y", function(d)
    {
        return yScale(d[1]);
    });

    // Update x-axis
    svg.select(".x.axis").transition().duration(1000).call(xAxis);

    // Update y-axis
    svg.select(".y.axis").transition().duration(1000).call(yAxis);
}

// set timer
var scaterTimer = $.timer(refreshScatterData);

$(document).ready(
        function()
        {

            // ---------------- start of JQuery ready ----------------

            // start the timer
            scaterTimer.set(
            {
                time : timerMillSecond,
                autostart : true
            });

            svg = d3.select("body").append("svg").attr("width", ww).attr("height", hh);

            var formatAsPercentage = d3.format(".1%");

            // Create SVG scatterplot

            svg.append("g").attr("id", "circles").attr("clip-path", "url(#chart-area)").selectAll("circle").data(dataset5).enter().append("circle").attr("cx",
                    function(d)
                    {
                        return xScale(d[0]);
                    }).attr("cy", function(d)
            {
                return yScale(d[1]);
            }).attr("r", function(d)
            {
                return rScale(d[1]);
            }).attr("fill", "orange");

            svg.selectAll("text").data(dataset5).enter().append("text").text(function(d)
            {
                return "[" + d[0] + "," + d[1] + "]";
            }).attr("x", function(d)
            {
                return xScale(d[0]);
            }).attr("y", function(d)
            {
                return yScale(d[1]);
            }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "red");

            // Create SVG clipping
            svg.append("clipPath") // Make a new clipPath
            .attr("id", "chart-area") // Assign an ID
            .append("rect") // Within the clipPath, create a new rect
            .attr("x", padding) // Set rect's position and size…
            .attr("y", padding).attr("width", ww - padding * 3).attr("height", hh - padding * 2);

            // render axis after other elements in the SVG are all rendered

            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (hh - padding) + ")").call(xAxis);

            svg.append("g").attr("class", "y axis").attr("transform", "translate(" + padding + ",0)").call(yAxis);

            d3.select("#scatterplot_controller").on("click", function()
            {

                refreshScatterData();
            });
            // ---------------- end of JQuery ready ----------------

        });
