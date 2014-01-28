//var dataset = [ { key : 0, value : 5 }, { key : 1, value : 10 }, { key : 2, value : 13 }, { key : 3, value : 19 }, { key : 4, value : 21 }, { key : 5, value : 25 }, { key : 6, value : 22 }, { key : 7, value : 18 }, { key : 8, value : 15 }, { key : 9, value : 13 }, { key : 10, value : 11 }, { key : 11, value : 12 }, { key : 12, value : 15 }, { key : 13, value : 20 }, { key : 14, value : 18 }, { key : 15, value : 17 }, { key : 16, value : 16 }, { key : 17, value : 18 }, { key : 18, value : 23 }, { key : 19, value : 25 } ];

var dataset = [];

var w = 600;
var h = 250;

var duration = 500;
var maxValue;
var timerMillSecond = 2000;

var xScale;
var yScale;

var sortOrder = false;

//identification of SVG
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);


// prepare for key and scale
var key = function(d)
{
    return d.key;
};

/*
 * sort all bars by their __data__ value
 */
var sortBars = function() {

//    sortOrder = !sortOrder;
//    
//    svg.selectAll("rect")
//       .sort(function(a, b) {
//             if(sortOrder) {
//                 return d3.ascending(a.value, b.value);
//             } else {
//                 return d3.ascending(b.value, a.value);
//             }
//             
//       })
//       .transition()
//       
//       .duration(100)
//       .attr("x", function(d, i) {
//             return xScale(i);
//       });

};

/*
 * refresh data and update the DOM elements
 */
var refreshBarData = function()
{
    // Add new value to dataset
    var lastKeyValue = dataset[dataset.length - 1].key;
    
    // fetch new value 
    
    data_update_request = $.ajax({
        url: "../chart/barplot/update/",
        type: "GET",
    });
    
    data_update_request.done(function(datavalue) {
          dataset.push(
                  {
                      key : datavalue.key,
                      value : datavalue.value
                  });
    });
    
    // Remove one value from dataset
    dataset.shift();

    // update the scale
    xScale.domain(d3.range(dataset.length));
    yScale.domain([ 0, d3.max(dataset, function(d)
    {
        return d.value;
    }) ]);

    // Select all bars
    // Re-bind data to existing bars, return the 'update' selection
    // 'bars' is now the update selection
    var bars = svg.selectAll("rect").data(dataset, key);

    // enter...
    // enter() addresses the one new corresponding DOM element, without
    // touching all the existing rects
    // the new bar is created OUT OF THE SVG SCOPE to be moved in later
    bars.enter().append("rect").attr("x", w).attr("y", function(d)
    {
        return h - yScale(d.value);
    }).attr("width", xScale.rangeBand()).attr("height", function(d)
    {
        return yScale(d.value);
    }).attr("fill", function(d)
    {
        return "rgb(0, 0, " + (d.value * 10) + ")";
    })
    .on("mouseover", function(d)
    {
        // get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
            
        // get max value
        refreshMax();
            
        d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text((d.value / maxValue) * 100);
            
        d3.select("#tooltip").classed("hidden", false);
          
    })
    .on("mouseout", function(d)
    {
        d3.select("#tooltip").classed("hidden", true);
    })
    ;

    // update...
    // Update all rects
    bars.transition().duration(duration).ease("linear").attr("x", function(d, i)
    {
        return xScale(i);
    }).attr("y", function(d)
    {
        return h - yScale(d.value);
    }).attr("width", xScale.rangeBand()).attr("height", function(d)
    {
        return yScale(d.value);
    });

    // exit...
    // bar exit
    bars.exit().transition().duration(500).attr("x", -xScale.rangeBand()).remove();

    // load and create new labels
    var bartexts = svg.selectAll("text").data(dataset, key);

    // enter new label
    bartexts.enter().append("text").text(function(d)
    {
        return d.value;
    }).attr("x", function(d, i)
    {
        return w;
    }).attr("y", function(d)
    {
        return h - yScale(d.value) + 14;
    }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "white").attr("text-anchor", "middle");

    // Update all labels
    bartexts.transition().ease("linear").duration(duration).attr("x", function(d, i)
    {
        return xScale(i) + xScale.rangeBand() / 2;
    }).attr("y", function(d)
    {
        return h - yScale(d.value) + 14;
    });

    // exit label
    bartexts.exit().transition().duration(500).attr("x", -xScale.rangeBand()).remove();

};


/*
 * get the max limit value from server side
 */
var refreshMax = function() {
    max_request = $.ajax({
    url: "../chart/barplot/max/",
    type: "GET",
});

    max_request.done(function(datavalue) {
        maxValue = datavalue;
        $("#maxvalue").text(datavalue);
    });
}

/*
 * update the max limit value in server side
 */
var updateMax = function() {
    $("#updatemax").on("click", function() {
        
        $.ajax({
            url: "../chart/barplot/max/" + $("#newmax").val(),
            type: "POST", 
            success: function(data, textStatus, jqXHR)
            {
                $("#maxvalue").text(data);
                $("#newmax").val("");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
         
            }
        });
        
    });
}

/*
 * set timer
 */ 
var barTimer = $.timer(refreshBarData);

$(document).ready(function()
{
	// ---------------- start of JQuery ready ----------------
    
    refreshMax();
    
    updateMax();
    
    data_initial_request = $.ajax({
        url: "../chart/barplot/",
        type: "GET",
    });
    
    data_initial_request.done(function(d) {
        
        dataset=d.pointList;
        
        xScale = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([ 0, w ], 0.05);

        yScale = d3.scale.linear().domain([ 0, d3.max(dataset, function(d)
        {
            return d.value;
        }) ]).range([ 0, h ]);
        
        // start the timer
        barTimer.set({
            time : timerMillSecond,
            autostart : true
        });
        
        // create SVG Bar
        svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

        // create bars
        svg.selectAll("rect").data(dataset, key).enter().append("rect")
        .attr("x", function(d, i)
        {
            return xScale(i);

        }).attr("y", function(d)
        {
            return h - yScale(d.value);
        }).attr("width", xScale.rangeBand()).attr("height", function(d)
        {
            return yScale(d.value);
        }).attr("fill", function(d)
        {
            return "rgb(0, 0, " + (d.value * 10) + ")";
        })
        .on("mouseover", function(d)
        {
//            // fill the bar with highlight color
//            d3.select(this).attr("fill", "orange");
            
         // get this bar's x/y values, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
            
            // get max value
            refreshMax();
            
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value")
                .text((d.value / maxValue) * 100);
            
            d3.select("#tooltip").classed("hidden", false);
          
        }).on("mouseout", function(d)
        {
//            // set the bar color back to normal
//            d3.select(this).transition().duration(250).attr("fill", "rgb(0, 0, " + (d.value * 10) + ")");
            
            // remove the tooltip
            d3.select("#tooltip").classed("hidden", true);
            
        })
        .on("click", function() {
            sortBars();
        })
        ;

        // create label
        svg.selectAll("text").data(dataset, key).enter().append("text").text(function(d)
        {
            return d.value;
        }).attr("x", function(d, i)
        {
            return xScale(i) + xScale.rangeBand() / 2;
        }).attr("y", function(d)
        {
            return h - yScale(d.value) + 14;
        }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "white").attr("text-anchor", "middle");

        // on-click event
        d3.select("#barplot_controller").on("click", function()
        {
            refreshBarData();
        });
        
        // load footer
        $.getScript("javascript/d3_test_footer.js");
        
    });
    
    
    
    // ---------------- end of JQuery ready ----------------

});
