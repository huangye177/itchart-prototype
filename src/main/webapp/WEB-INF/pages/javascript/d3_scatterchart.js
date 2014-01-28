
/**
 * Fetch randomly updated data.
 * 
 * Data format:
 * 
 * [Object { key="Group 0", values=[40]}, 
 * Object { key="Group 1", values=[40]}, 
 * Object { key="Group 2", values=[40]}, 
 * Object { key="Group 3", values=[40]}, 
 * ......]
 *
 * Object {
 *   key: "Group 0",
 *   values: [{shape: "circle",
 *             size: 0.7909574428875181,
 *             x: 0.01435420549658652,
 *             y: -0.5507397014913694}, 
 *             
 *             {shape: "triangle-up",
 *             size: 0.5831457631770078, 
 *             x: -0.6140558891668343,
 *             y: -1.7927638197498457}, 
 *            
 *            ......]
}
 */
function randomData(groups, points) { 
    
      var data = [],
          shapes = ['circle', 'square', 'cross', 'triangle-up', 'triangle-down', 'diamond'],
          random = d3.random.normal();

      /*
       * assign the group key for this group of scatter points
       */
      for (var i = 0; i < groups; i++) {
        data.push({
          key: 'Group ' + i,
          values: []
        });

        /*
         * within each group, each of its value is an object with four attributes: "x", "y", "size", "shape"
         */
        for (var j = 0; j < points; j++) {
          data[i].values.push({
            x: random(), 
            y: random(), 
            size: Math.random(), 
            shape: shapes[j % 6]
          });
        }
      }
      
      return data;
    }

var timerMillSecond = 3000;

var chart;

/**
 * plot function
 */
var plot = function() {
    
    nv.addGraph(function() {
        
        chart = nv.models.scatterChart()
                      .showDistX(true)
                      .showDistY(true)
                      .useVoronoi(true)
                      .color(d3.scale.category10().range())
                      .transitionDuration(1000)
                      ;

        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        
        chart.tooltipContent(function(key) {
            return '<h2>' + key + '</h2>';
        });

        d3.select('#test1 svg')
            .datum(randomData(3,30))
            .call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });

        return chart;
      });
};


//set timer
var timer = $.timer(function(){
    return plot();
});

$(document).ready(function()
{
    // ---------------- start of JQuery ready ----------------
    
    // start the timer
    timer.set({
        time : timerMillSecond,
        autostart : true
    });
    
    // initialize the plot
    return plot();
    
    // ---------------- end of JQuery ready ----------------

});
