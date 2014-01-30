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

var color = d3.scale.category10();

var line = d3.svg.line().interpolate("basis").x(function(d)
{
    return xScale(d.datetime);
}).y(function(d)
{
    return yScale(d.value);
});

var keyDatetime = function(d)
{
    return d.datetime;
};

var initialData;
var initialDataInArray;
var dsarray;
var datetimearray;
var measarray;

/*
 * get updated data from RESTful and change HTML element accordingly 
 */
var refreshLineData = function()
{

    // load update data
    data_update_request = $.ajax(
    {
        url : "../chart/multiserieslineplot/update",
        type : "GET",
    });

    data_update_request.done(function(updateData)
    {
        updateData = updateData.pointMap;

        // update initialData size
        $.each(updateData, function(key, value) {
        	
            value.measurement.forEach(function(d) {
            	d.datetime = parseJSONDate(d.datetime);
            	datetimearray.push(d.datetime);
            	measarray.push(d.value);
            });
            
            initialDataInArray.forEach(function(d) {
        		if(key == d.dataSeriesName) {
        			value.measurement.forEach(function(dd){
        				d.measurement.push({
            				datetime: dd.datetime,
            				value: dd.value
            			});
        			});
        			
        		} else {
        			// not hit
        		}
        	});
        });

        // update axis and line plot
//        d3.select("svg").remove();
//        d3.select("#footerid").remove();

        var svg = d3.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xScale.domain(d3.extent(datetimearray));
        yScale.domain(d3.extent(measarray));
        
        // update axis
        xAxis.scale(xScale).orient("bottom");
        yAxis.scale(yScale).orient("left");
        
        svg.selectAll("#x-axis-id").call(xAxis);
        svg.selectAll("#y-axis-id").call(yAxis);
//        svg.selectAll("g.x.axis").call(xAxis);
//        svg.selectAll("g.y.axis").call(yAxis);
        
//        multiline = svg.selectAll(".multiline")
//    		.data(initialDataInArray)
//    		.enter().append("g")
//    		.attr("class", "multiline");
//
//        multiline.append("path").attr("id", function(d) { return "path-id-" + d.dataSeriesName; })
//    		.attr("class", "line")
//    		.attr("d", function(d) { return line(d.measurement); })
//    		.style("stroke", function(d) { return color(d.dataSeriesName); });
        
        initialDataInArray.forEach(function(d) {
        	var lineId = "#path-id-" + d.dataSeriesName; 
        	svg.selectAll(lineId)
        		.attr("class", "line").attr("d", function(d) { return line(d.measurement); });
        });
    
        // draw line
//        svg.selectAll("#path-id").datum(initialData).attr("class", "line").attr("d", line);

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
        	
            var svg = d3.select("body").append("svg").attr("id", "multilineplot_svg_id").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append(
                    "g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            // load data
            data_update_request = $.ajax(
            {
                url : "../chart/multiserieslineplot",
                type : "GET",
            });

            data_update_request.done(function(da)
            {
                initialData = da.pointMap;
                
                // initial data in array
                initialDataInArray = [];
                dsarray = [];
                datetimearray = [];
                measarray = [];
                		
                $.each(initialData, function(key, value) {
                    dsarray.push(key);
                    initialDataInArray.push(value);
                    
                    value.measurement.forEach(function(d) {
                    	d.datetime = parseJSONDate(d.datetime);
                    	datetimearray.push(d.datetime);
                    	measarray.push(d.value);
                    });
                });
                
                // set color
                color.domain(dsarray);

                xScale.domain(d3.extent(datetimearray));
                yScale.domain(d3.extent(measarray));
             
                /*
                 * plot gridline
                 */
                xAxis.scale(xScale).orient("bottom").ticks(tickCount).tickSize(-height, -height, 0);
                yAxis.scale(yScale).orient("left").ticks(tickCount).tickSize(-width, -width, 0);

                // draw axis
                svg.append("g").attr("id", "x-axis-id").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                svg.append("g").attr("id", "y-axis-id").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
                        "text-anchor", "end").text("Measurement (in)");

                // draw multi-lines
                var multiline = svg.selectAll(".multiline")
                	.data(initialDataInArray)
                	.enter().append("g")
                	.attr("class", "multiline");

                multiline.append("path").attr("id", function(d) { return "path-id-" + d.dataSeriesName; })
                	.attr("class", "line")
                	.attr("d", function(d) { return line(d.measurement); })
                	.style("stroke", function(d) { return color(d.dataSeriesName); });

                multiline.append("text")
                	.datum(function(d) { return {dname: d.dataSeriesName, dvalue: d.measurement[d.measurement.length - 5]}; })
                	.attr("transform", function(d) { return "translate(" + xScale(d.dvalue.datetime) + "," + yScale(d.dvalue.value) + ")"; })
                	.attr("x", 3)
                	.attr("dy", ".35em")
                	.text(function(d) { return d.dname; });
            
                // draw line
//                svg.append("path").attr("id", "path-id").datum(initialData).attr("class", "line")
//                .attr("d", function(d){return line(d.measurement)} ).style("stroke", function(d) { return color(d.dataSeriesName); });
                
                // load footer
                $.getScript("javascript/d3_test_footer.js");

            });

            // ---------------- end of JQuery ready ----------------

        });