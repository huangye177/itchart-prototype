




$(document).ready(function()
{
    // ---------------- start of JQuery ready ----------------
    
    
    

    d3.select("body").append("p").attr("id", "footerid").text("More samples:")
        .append("ul")
        .append("li").append("a").text("Barplot (D3)").attr("href", "d3_barplot.html")
        .append("li").append("a").text("Single-Series Lineplot (D3)").attr("href", "d3_lineplot.html")
        .append("li").append("a").text("Single-Series Bivariate Lineplot (D3)").attr("href", "d3_bivariate_lineplot.html")
        .append("li").append("a").text("Multi-Series Lineplot (D3)").attr("href", "d3_multilineplot.html")
        .append("li").append("a").text("Multi-Axis Multi-Series Lineplot (D3)").attr("href", "d3_multiaxislineplot.html")
        .append("li").append("a").text("Scatterplot (D3)").attr("href", "d3_scatterplot.html")
        .append("li").append("a").text("Multi-Series Lineplot (D3 out-dated)").attr("href", "d3_multi_lineplot.html")
        .append("li").append("a").text("ScatterChart (D3 + NVD)").attr("href", "d3_scatterchart.html")
        .append("li").append("a").text("lineWithFocusChart (D3 + NVD)").attr("href", "d3_linewithfocuschart.html");

    

    // ---------------- end of JQuery ready ----------------

});
